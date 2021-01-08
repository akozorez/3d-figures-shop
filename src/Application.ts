import * as debug from 'debug';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import { MONGO_CONNECTION_OPTIONS, MONGO_URI } from './Settings';

export default class Application {
    private readonly log: debug.Debugger;
    private readonly port: number;
    private readonly app: express.Express;
    private db: typeof mongoose;

    constructor() {
        this.port = process.env.port ? parseInt(process.env.port) : 8080;
        this.log = debug(this.constructor.name);
        this.app = express();
        this.initMiddleware();
    }

    public async start(): Promise<void> {
        this.db = await connect(MONGO_URI, MONGO_CONNECTION_OPTIONS);
        http.createServer(this.app).listen(this.port, this.onListen);
    }

    public initMiddleware = (): void => {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(this.onRequest);
    };

    private onRequest = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        this.log(`[${req.method}] on path ${req.path}`);
        next();
    };

    private onListen = (): void => {
        this.log(`Server listen on http://localhost:${this.port}`);
    };
}
