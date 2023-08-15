import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import UtilityRouter from './routes/utility.routes.js';
import SocketController from './controllers/socket.controller.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

app.use('/utility', UtilityRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('nconn', (msg) => {
    SocketController.onConnection(socket, msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
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
httpServer.listen(4040, () => {console.log('Websocket at PORT 3000');});
app.listen(8080, () => console.log(`Server at PORT 8080`));
