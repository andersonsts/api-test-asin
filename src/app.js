import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import limiter from './config/rateLimit';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    // this.server.use(limiter);
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
