import assert from 'assert'
import cp from 'child_process'
import crypto from 'crypto'
import split2 from 'split2'

import { WebSocket } from 'ws'
import { FluentBitOpts } from '../common/types'

const FLUENT_BIT_EXEC_PATH = process.env.FLUENT_BIT_EXEC_PATH || '/fluent-bit/bin/fluent-bit';

interface FlbManager {
  connect: (userId: string, datasocket: WebSocket, opts: FluentBitOpts) => string
  write: (instanceId: string, data: string) => void;
  disconnect: (userId: string, socket: WebSocket) => void
  disconnectAll: () => void
  count: () => number
}

interface FlbInstance {
  connect: (socket: WebSocket) => void;
  disconnect: (socket: WebSocket) => void;
  write: (data: string) => void;
  disconnectAll: () => void;
  connectedCount: () => number;
  datasource: () => string;
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
};

function spawnFluentBit({ datasource }: FluentBitOpts): FlbInstance {
  const sockets = new Set<WebSocket>()

  const ds = datasource === 'http' ? 'stdin' : datasource

  const flb = cp.spawn(FLUENT_BIT_EXEC_PATH, [
    '-i', ds,
    '-o', 'stdout',
    '-p', 'format=json',
    '-f', '0.2'
  ])
  flb.stdout.setEncoding('utf-8');
  flb.stderr.setEncoding('utf-8');

  function broadcast(payload: any) {
    if (!sockets.size) {
      return
    }
    const json = JSON.stringify(payload)
    for (const socket of sockets) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(json)
      }
    }
  }

  flb.stdout.pipe(split2(JSON.parse)).on('data', (records: any) => {
    broadcast({event: 'stdout', records})
  }).on('error', (err: Error) => {
    broadcast({event: 'stdout', error: err.stack || err.message})
  })

  flb.stderr.on('data', (data) => {
    broadcast({event: 'stderr', payload: data})
  })

  flb.on('exit', (code, signal) => {
    // This should normally be a no-op happen since we only kill fluent-bit
    // once all sockets are disconnected. The goal here is notify the UI if
    // something goes wrong, like fluent-bit crashes.
    broadcast({event: 'exit', code, signal})
  })

  return {
    connect(socket) {
      sockets.add(socket)
    },

    write(data) {
      if (Array.isArray(data)) {
        for (const obj of data) {
          flb.stdin.write(JSON.stringify(obj) + '\n')
        }
      } else {
        flb.stdin.write(JSON.stringify(data) + '\n')
      }
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
      return datasource;
    }
  }
}

let singleton: FlbManager;

export default function flbManager(): FlbManager {
  if (singleton) {
    return singleton;
  }

  const instances = new Map<string, FlbInstance>()
  const userToToken = new Map<string, string>()
  const tokenToUser = new Map<string, string>()

  return {
    connect(userId, socket, opts) {
      let instance = instances.get(userId)

      if (instance && instance.datasource() !== opts.datasource) {
        // changing datasource, restart
        instance.disconnectAll();
        instance = undefined;
      }

      if (!instance) {
        instance = spawnFluentBit(opts)
        instances.set(userId, instance)
      }

      let token = userToToken.get(userId)
      if (!token) {
        token = generateToken();
        userToToken.set(userId, token);
        tokenToUser.set(token, userId);
      }

      instance.connect(socket)
      return token;
    },

    write(token, data) {
      const userId = tokenToUser.get(token)
      if (!userId) {
        throw new Error(`Could not find any fluent-bit instances for token ${token}`)
      }
      const instance = instances.get(userId)
      assert(instance)
      instance.write(data);
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
        instance.disconnectAll();
        instances.delete(userId);
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
  console.error(err);
  exitHandler(true, 1);
})
