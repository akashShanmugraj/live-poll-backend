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
app.listen(8080, () => console.log(`Server at PORT 8080`));
