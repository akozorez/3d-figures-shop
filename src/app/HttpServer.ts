import * as debug from 'debug';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { MONGO_CONNECTION_OPTIONS, MONGO_URI } from './Const';
import { UserModel} from '../models/UserModel';
import UserService from '../services/UserService';

export default class HttpServer {
    private readonly log: debug.Debugger;
    private readonly port: number;
    private readonly app: express.Express;

    constructor() {
        this.port = process.env.port ? parseInt(process.env.port) : 8080;
        this.log = debug(this.constructor.name);
        this.app = express();
        //add u services

        //
        this.app.set('view engine', 'ejs');
        this.initHandlers();
    }

    public async start(): Promise<void> {
        await mongoose.connect(MONGO_URI, MONGO_CONNECTION_OPTIONS);
        let result = await UserService.delete("admin1");
        let result2 = await UserService.getAll();
        this.log(result);
        this.log(result2);
        http.createServer(this.app).listen(this.port, this.onListen);
    }

    public initHandlers = (): void => {
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
