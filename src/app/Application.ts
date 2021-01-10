import * as debug from 'debug';
import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import { IDebugger, Express, IApplication } from './interfaces';
import { MONGO_URI, MONGO_SETTINGS, APP_SETTINGS, PORT, OPTION_FORMATTER, HANDLER_FORMATTER } from './Const';
import Middleware from './Middleware';

export default class Application implements IApplication {
    private readonly log: IDebugger;
    private readonly app: Express;

    constructor() {
        this.log = debug(this.constructor.name);
        this.app = express();
        for (const option of APP_SETTINGS) {
            this.app.set(option.key, option.value);
            this.log(OPTION_FORMATTER, option.key, option.value);
        }
        const middlewares = new Middleware().handlers;
        for (const handler of middlewares) {
            this.app.use(handler);
            this.log(HANDLER_FORMATTER, handler.name);
        }
    }

    public async start(): Promise<http.Server> {

        return new Promise(async (resolve, reject) => {
            try {
                await mongoose.connect(MONGO_URI, MONGO_SETTINGS);
                resolve(http.createServer(this.app).listen(this.app.get(PORT)));
            } catch (err) {
                reject(err.message);
            }
        });
    }

    public getLogger(): IDebugger {
        return this.log;
    }

    public getPort(): number {
        return this.app.get(PORT);
    }
}
