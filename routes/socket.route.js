import SocketController from './controllers/socket.controller.js';
import express from 'express';

const SocketRouter = express.Router();

SocketRouter.route("/nconn").post(SocketController.onConnection);
SocketRouter.route("/relay").post((req, res) => {}));