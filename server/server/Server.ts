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
    this.io = new ServerIo(this.server);
    this.port = process.env.PORT || 4000;

    this.middlewares();
  }

  private middlewares() {
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}
