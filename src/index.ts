import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
import { productRouter } from './routes/productRoutes';
import UpdateChannelsTask from './tasks/updateChannelsTask'; // Import the task


dotenv.config();

class App {
    public app: express.Application;
    private logger: Logger;

    constructor() {
        this.app = express();
        this.logger = new Logger('Express');
        this.config();
        this.routes();
        this.errorHandler();
        UpdateChannelsTask; // Initialize the task
    }

    private config(): void {
        // Middleware to set various HTTP headers for security
        this.app.use(helmet());

        // Body parser middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Logging middleware
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            this.logger.log(`${req.method} ${req.originalUrl}`);
            next();
        });
    }

    private routes(): void {
        this.app.use('/products', productRouter);
        // Add more routers here...
    }

    private errorHandler(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            this.logger.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`App listening on http://localhost:${port}`);
        });
    }
}

// Initialize and start the server
const port = process.env.PORT || 3000;
const server = new App();
server.listen(port);