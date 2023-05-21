import { Sequelize } from 'sequelize';
import { Logger } from '../utils/logger';

export class Database {
  private sequelize: Sequelize;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('Database');
    this.sequelize = new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: 'postgres',
      logging: (msg) => this.logger.log(msg),
      retry: {
        max: 5, // maximum number of connection retries
      },
    });
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}