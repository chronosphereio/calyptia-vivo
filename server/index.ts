require('dotenv').config()

import express from 'express'
import http from 'http'
import next from 'next'
import { WebSocketServer } from 'ws'
import { createProxyMiddleware } from 'http-proxy-middleware'
import flbManager from './flb_manager'
import { FLUENT_BIT_HTTP_HOST, FLUENT_BIT_HTTP_PORT } from '../common/constants'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 5489
const nextApp = next({ dev, hostname, port })
const nextHandle = nextApp.getRequestHandler()

const app = express()
const proxyPattern = /^\/sink/
app.use(createProxyMiddleware((pathname, req) => {
  return proxyPattern.exec(pathname) != null && req.method === 'POST'
}, {
  target: {
    host: FLUENT_BIT_HTTP_HOST,
    port: FLUENT_BIT_HTTP_PORT,
    protocol: 'http:'
  },
  changeOrigin: true,
  pathRewrite: function(path) {
    return path.replace(proxyPattern, '/')
  }
}))

let healthy = false

app.get('/healthz', (_req, res) => {
  if (healthy) {
    res.status(200).json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    })
  } else {
    res.status(503).json({
      uptime: process.uptime(),
      message: 'NOK',
      timestamp: Date.now()
    })
  }
})

let websocketConnections = 0

app.get('/stats', (_req, res) => {
  res.status(200).json({ websocketConnections, fluentBitInstances: manager.count() })
})

app.get('*', (req, res) => {
  return nextHandle(req, res)
})

const wss = new WebSocketServer({ clientTracking: false, noServer: true })
const manager = flbManager()

const userId = 'stubUser'

manager.connect(userId, {
  send(json: string) {
    process.stderr.write("fluent-bit:" + json + "\n", "utf-8")
  }
}, { datasource: 'http' })

wss.on('connection', (ws) => {
  console.log("Received websocket connection upgrade")
  websocketConnections++

  ws.once('message', (msg) => {
    try {
      const opts = JSON.parse(msg.toString())
      manager.connect(userId, ws, opts)

      ws.on('close', function () {
        websocketConnections--
        manager.disconnect(userId, ws)
      })
    } catch (err) {
      ws.close()
    }
  })
})

const server = http.createServer(app)
server.on('upgrade', function (request: any, socket, head) {
  if (request.url !== '/flb') {
    return
  }
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit('connection', ws, request)
  })
})

async function start() {
  await nextApp.prepare()
  server.listen(port, (err?: Error) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    healthy = true
  })
}

start().catch(err => {
  healthy = false
  console.error(err)
  process.exit(1)
})
