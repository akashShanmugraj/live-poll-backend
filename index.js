import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import UtilityRouter from './routes/utility.routes.js';
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

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(3000, () => {console.log('Websocket at PORT 3000');});
app.listen(8080, () => console.log(`Server at PORT 8080`));
