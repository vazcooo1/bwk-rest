import express, { Application, Request, Response, NextFunction } from 'express';
import { Logger } from './utils/logger';

export class App {
  public app: Application;
  private logger: Logger;

  constructor() {
    this.app = express();
    this.logger = new Logger('Express');
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.log(`${req.method} ${req.originalUrl}`);
      next();
    });
  }

  private routes(): void {
    // define your routes here
  }

  private errorHandler(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      this.logger.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }
}