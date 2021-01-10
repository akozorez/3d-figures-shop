import * as bodyParser from 'body-parser';
import {
    NextFunction,
    Request,
    Response,
    IDebugger,
    IMiddleware,
    MiddlewareHandler,
    staticMiddleware,
} from './interfaces';
import { ERROR_FORMATTER, PUBLIC_FOLDER, REQUEST_FORMATTER, SERVER_SIDE_ERROR } from './Const';
import * as debug from 'debug';
import Router from './Router';

export default class Middleware implements IMiddleware {
    private readonly log: IDebugger;
    private readonly _handlers: MiddlewareHandler[];
    private readonly parser = bodyParser.urlencoded({ extended: true });
    private readonly web = Router.getRouter();
    private readonly static = staticMiddleware(PUBLIC_FOLDER);

    constructor() {
        this.log = debug(this.constructor.name);
        this._handlers = [
            this.errorMiddleware = this.errorMiddleware.bind(this),
            this.requestMiddleware = this.requestMiddleware.bind(this),
            this.parser,
            this.static,
            this.web,
        ];
    }

    private errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
        this.log(ERROR_FORMATTER, err.message);
        const status = err.status || 500;
        return res
            .status(status)
            .render('error', { status: status, message: SERVER_SIDE_ERROR });
    }

    private requestMiddleware(req: Request, res: Response, next: NextFunction): void {
        this.log(REQUEST_FORMATTER, req.method, req.path);
        next();
    }

    public get handlers(): MiddlewareHandler[] {
        return this._handlers;
    }

}