import http from 'http'

import express from 'express';
import bodyParser from 'express';
/* import session from 'express-session'; */
import next from 'next'
import { WebSocketServer } from 'ws';

import flbManager from './flb_manager'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 5489;
const nextApp = next({ dev, hostname, port })
const nextHandle = nextApp.getRequestHandler()

const app = express()
.use(bodyParser.json())


app.get('/api/hello', (_req, res) => {
  res.status(200).json({ name: 'Overriden' })
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

wss.on('connection', (ws) => {
  const userId = 'stubUser'

  ws.once('message', (msg) => {
    try {
      const opts = JSON.parse(msg.toString());
      const token = manager.connect(userId, ws, opts)
      ws.send(JSON.stringify({ token }));

      ws.on('close', function () {
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
  })
}

start().catch(err => {
  console.error(err)
  process.exit(1)
})
