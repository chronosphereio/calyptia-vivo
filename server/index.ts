import http from 'http'

import express from 'express';
import bodyParser from 'express';
/* import session from 'express-session'; */
import next from 'next'
import { WebSocketServer } from 'ws';
import { program } from 'commander';

import flbManager from './flb_manager'

program
.option('--single-user');

program.parse();
const opts = program.opts();

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 5489;
const nextApp = next({ dev, hostname, port })
const nextHandle = nextApp.getRequestHandler()

const app = express()
.use(bodyParser.json({limit: 1024 * 1024 * 10}))

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
});

let websocketConnections = 0

app.get('/stats', (_req, res) => {
  res.status(200).json({ websocketConnections, fluentBitInstances: manager.count() })
});

app.get('*', (req, res) => {
  return nextHandle(req, res)
});

app.post('/flb/:token', async (req, res) => {
  const { token } = req.params;
  try {
    manager.write(token, req.body);
    res.sendStatus(200).end()
  } catch (err) {
    res.sendStatus(404).end();
  }
});

const wss = new WebSocketServer({ clientTracking: false, noServer: true });
const manager = flbManager()

const userId = 'stubUser';

if (opts.singleUser) {
  const consoleToken = manager.connect(userId, {
    send(json: string) {
      process.stderr.write("fluent-bit:" + json + "\n", "utf-8");
    }
  }, { datasource: 'http' })

  app.post('/console', async (req, res) => {
    try {
      manager.write(consoleToken, req.body);
      res.sendStatus(200).end()
    } catch (err) {
      res.sendStatus(404).end();
    }
  });
}

wss.on('connection', (ws) => {
  websocketConnections++;

  ws.once('message', (msg) => {
    try {
      const opts = JSON.parse(msg.toString());
      const token = manager.connect(userId, ws, opts)
      ws.send(JSON.stringify({ token }));

      ws.on('close', function () {
        websocketConnections--;
        manager.disconnect(userId, ws);
      });
    } catch (err) {
      ws.close();
    }
  })
})

const server = http.createServer(app);
server.on('upgrade', function (request: any, socket, head) {
  if (request.url !== '/flb') {
    return
  }
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit('connection', ws, request);
  });
})

async function start() {
  await nextApp.prepare()
  server.listen(port, (err?: Error) =>{
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
