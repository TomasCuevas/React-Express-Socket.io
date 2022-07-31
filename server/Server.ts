import express from 'express';
import { Server as ServerIo } from 'socket.io';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';

export class Server {
  private app;
  private port;
  private server;
  private io;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new ServerIo(this.server, {
      cors: {
        origin: process.env.CORS_ALLOWED,
      },
    });
    this.port = process.env.PORT || 4000;

    this.middlewares();
    this.listenEvent();
  }

  private middlewares() {
    this.app.use(morgan('dev'));
  }

  private listenEvent() {
    this.io.on('connection', (socket) => {
      console.log(socket.id);

      socket.on('newMessage', (message) => {
        socket.broadcast.emit('newMessage', message);
      });
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}
