import { EventEmitter } from 'events'

export interface FlbStdoutEventData {
  id: string
  data: Record<string, unknown>
}

export interface FlbErrorEventData {
  message: string
  raw: string
}

export interface FlbStdoutEventListener {
  (newRecords: FlbStdoutEventData[]): void
}

export interface FlbStderrEventListener {
  (data: string): void
}

export interface FlbErrorEventListener {
  (data: FlbErrorEventData): void
}

export interface FlbConnection {
  on(event: 'stdout', listener: FlbStdoutEventListener): this
  on(event: 'stderr', listener: FlbStderrEventListener): this
  on(event: 'error', listener: FlbErrorEventListener): this
  off(event: 'stdout', listener: FlbStdoutEventListener): this
  off(event: 'stderr', listener: FlbStderrEventListener): this
  off(event: 'error', listener: FlbErrorEventListener): this
  close(): void
}

let connectionId = 1

export function flbConnection(datasource: string): FlbConnection {
  const emitter = new EventEmitter()
  const url = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/flb"
  let socket: WebSocket
  // unique id of the record, used by "key" react property
  let recordId = 1
  let connId = connectionId++

  function init() {
    const sock = new WebSocket(url)

    sock.onopen = function (event) {
      console.log('Connected to:', (event.currentTarget as any).url)
      sock.send(JSON.stringify({ datasource }))
      socket = sock
    }

    sock.onerror = function (err) {
      console.warn('Websocket error:', err)
      console.warn('Retrying connection...')
      setTimeout(init, 1000)
    }

    sock.onmessage = function (event) {
      const eventData = JSON.parse(event.data)
      if (eventData.event === 'stdout') {
        if (eventData.records) {
          emitter.emit('stdout', eventData.records.map((r: any) => ({ id: `${connId}:${recordId++}`, data: r })))
        } else {
          emitter.emit('error', {
            message: `Failed to parse stdout JSON: ${eventData.error}`,
            raw: eventData.raw
          })
        }
      } else if (eventData.event === 'stderr') {
        emitter.emit('stderr', eventData.payload)
      }
    }
  }

  const timer = setTimeout(init, 100)

  const rv: FlbConnection = {
    on(event, listener) {
      emitter.on(event, listener)
      return this
    },

    off(event, listener) {
      emitter.off(event, listener)
      return this
    },

    close() {
      clearTimeout(timer)
      if (socket && socket.readyState !== 3) {
        socket.close()
      }
    }
  }

  return rv
}
