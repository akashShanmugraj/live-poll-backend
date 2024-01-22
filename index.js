import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import UtilityRouter from './routes/utility.routes.js';
import SocketController from './controllers/socket.controller.js';


const app = express();
app.use(bodyParser.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

app.use('/utility', UtilityRouter);
app.get('/api', (req, res) => {
  res.send('Live-Poll API');
});
io.on('connection', (socket) => {
  
  console.log('a user connected');

  socket.on('nconn', (msg) => {
    SocketController.onConnection(socket, msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('info', (msg) => {
   console.log(msg);
  });

  socket.on('err', (msg) => {
    console.error(msg);
  });
});

app.get('/notlive/:id', (req, res) => {
  SocketController.onNotLive(io, req.params.id);
  res.send('OK').status(200);
});

app.get('/live/:id', (req, res) => {
  SocketController.onLive(io, req.params.id);
  res.send('OK').status(200);
});

app.get('/abort/:id', (req, res) => {
  SocketController.onAbort(io, req.params.id);
  res.send('OK').status(200);
});

app.get('/reload/:id', (req, res) => {
  SocketController.onReload(io, req.params.id);
  res.send('OK').status(200);
});

app.post('/relay/:id', (req, res) => {
  try {
    SocketController.onRelay(io, req.body, req.params.id);
    res.send('OK').status(200)  ;
  } catch (err) {
    console.log(err);
    res.send(err)
  }
});
httpServer.listen(4040, () => {console.log('Websocket at PORT 4040');});
app.listen(3030, () => console.log(`Server at PORT 8080`));
