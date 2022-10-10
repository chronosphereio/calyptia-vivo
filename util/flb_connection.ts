import { EventEmitter } from 'events'

export interface FlbStdoutEventData {
  id: string
  data: any
}

export interface FlbErrorEventData {
  message: string
  raw: string
}

export interface FlbTokenEventListener {
  (token: string): void
}

export interface FlbStdoutEventListener {
  (newRecords: FlbStdoutEventData[]): void
}

export interface FlbStderrEventListener {
  (data: string): void;
}

export interface FlbErrorEventListener {
  (data: FlbErrorEventData): void;
}

export interface FlbConnection {
  once(event: 'token-received', listener: FlbTokenEventListener): this;
  on(event: 'stdout', listener: FlbStdoutEventListener): this;
  on(event: 'stderr', listener: FlbStderrEventListener): this;
  on(event: 'error', listener: FlbErrorEventListener): this;
  off(event: 'stdout', listener: FlbStdoutEventListener): this;
  off(event: 'stderr', listener: FlbStderrEventListener): this;
  off(event: 'error', listener: FlbErrorEventListener): this;
  close(): void;
}

let connectionId = 1

export function flbConnection(datasource: string): FlbConnection {
  const emitter = new EventEmitter()
  const url = ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/flb"
  let socket: WebSocket
  // unique id of the record, used by "key" react property
  let recordId = 1;
  let connId = connectionId++;
  let token: string;

  function init() {
    socket = new WebSocket(url);

    socket.onopen = function(event) {
      console.log('Connected to:', (event.currentTarget as any).url);
      socket.send(JSON.stringify({ datasource }))
    }

    socket.onerror = function(err) {
      console.log('Websocket error:', err)
    }

    socket.onmessage = function(event) {
      const eventData = JSON.parse(event.data)
      if (!token) {
        /* first message must be the token */
        token = eventData.token;
        emitter.emit('token-received', token);
        return;
      }

      if (eventData.event === 'stdout') {
        if (eventData.records) {
          emitter.emit('stdout', eventData.records.map((r: any) => ({ id: `${connId}:${recordId++}`, data: r })));
        } else {
          emitter.emit('error', {
            message: `Failed to parse stdout JSON: ${eventData.error}`,
            raw: eventData.raw
          });
        }
      } else if (eventData.event === 'stderr') {
        emitter.emit('stderr', eventData.payload)
      }
    }
  }

  const timer = setTimeout(init, 100);

  const rv: FlbConnection = {
    once(event, listener) {
      emitter.once(event, listener);
      return this;
    },

    on(event, listener) {
      emitter.on(event, listener);
      return this;
    },

    off(event, listener) {
      emitter.off(event, listener);
      return this;
    },

    close() {
      clearTimeout(timer);
      if (socket && socket.readyState !== 3) {
        socket.close()
      }
    }
  }

  return rv
}
