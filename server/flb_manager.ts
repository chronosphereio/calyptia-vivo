import cp from 'child_process'
import split2 from 'split2'

import { FluentBitOpts } from '../common/types'
import { FLUENT_BIT_HTTP_HOST, FLUENT_BIT_HTTP_PORT, FLUENT_BIT_EXEC_PATH } from '../common/constants'

export interface Socket {
  send: (json: string) => void
}

interface FlbManager {
  connect: (userId: string, datasocket: Socket, opts: FluentBitOpts) => void
  disconnect: (userId: string, socket: Socket) => void
  disconnectAll: () => void
  count: () => number
}

interface FlbInstance {
  connect: (socket: Socket) => void
  disconnect: (socket: Socket) => void
  disconnectAll: () => void
  connectedCount: () => number
  datasource: () => string
}

function spawnFluentBit({ datasource }: FluentBitOpts): FlbInstance {
  const sockets = new Set<Socket>()

  const args = [
    '-i', datasource,
  ].concat(datasource === 'http' ? [
    `-phost=${FLUENT_BIT_HTTP_HOST}`,
    `-pport=${FLUENT_BIT_HTTP_PORT}`,
  ] : []).concat([
    '-o', 'stdout',
    '-p', 'format=json',
    '-f', '0.2'
  ])

  const flb = cp.spawn(FLUENT_BIT_EXEC_PATH, args, {
    stdio: ['ignore', 'pipe', 'pipe']
  })
  flb.stdout.setEncoding('utf-8')
  flb.stderr.setEncoding('utf-8')

  function broadcast(payload: any) {
    if (!sockets.size) {
      return
    }
    const json = JSON.stringify(payload)
    for (const socket of sockets) {
      socket.send(json)
    }
  }

  flb.stdout.pipe(split2(JSON.parse)).on('data', (records: any) => {
    broadcast({ event: 'stdout', records })
  }).on('error', (err: Error) => {
    broadcast({ event: 'stdout', error: err.stack || err.message })
  })

  flb.stderr.on('data', (data) => {
    broadcast({ event: 'stderr', payload: data })
  })

  flb.on('exit', (code, signal) => {
    // This should normally be a no-op happen since we only kill fluent-bit
    // once all sockets are disconnected. The goal here is notify the UI if
    // something goes wrong, like fluent-bit crashes.
    broadcast({ event: 'exit', code, signal })
  })

  return {
    connect(socket) {
      sockets.add(socket)
    },

    disconnect(socket) {
      sockets.delete(socket)

      if (sockets.size === 0) {
        flb.kill()
      }
    },

    disconnectAll() {
      for (const entry of sockets.entries()) {
        this.disconnect(entry[0])
      }
    },

    connectedCount() {
      return sockets.size
    },

    datasource() {
      return datasource
    }
  }
}

let singleton: FlbManager

export default function flbManager(): FlbManager {
  if (singleton) {
    return singleton
  }

  const instances = new Map<string, FlbInstance>()

  return {
    connect(userId, socket, opts) {
      let instance = instances.get(userId)

      if (instance && instance.datasource() !== opts.datasource) {
        // changing datasource, restart
        instance.disconnectAll()
        instance = undefined
      }

      if (!instance) {
        instance = spawnFluentBit(opts)
        instances.set(userId, instance)
      }

      instance.connect(socket)
    },

    disconnect(userId, socket) {
      let instance = instances.get(userId)
      if (!instance) {
        console.warn(`Could not find fluent-bit instance for user "${userId}"`)
        return
      }
      instance.disconnect(socket)
      if (!instance.connectedCount()) {
        instances.delete(userId)
      }
    },

    disconnectAll() {
      for (const [userId, instance] of instances.entries()) {
        instance.disconnectAll()
        instances.delete(userId)
      }
    },

    count() {
      return instances.size
    }
  }
}

function exitHandler(shouldExit: boolean, exitCode: number) {
  if (singleton) {
    singleton.disconnectAll()
  }
  if (shouldExit) {
    process.exit(exitCode)
  }
}

process.on('exit', exitHandler.bind(null, false, 0))
process.on('SIGINT', exitHandler.bind(null, true, 0))
process.on('SIGTERM', exitHandler.bind(null, true, 0))
process.on('uncaughtException', (err) => {
  console.error(err)
  exitHandler(true, 1)
})
