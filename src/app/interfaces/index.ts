import { IDebugger } from 'debug';
import * as express from 'express';
import {
    Express, Request, Response, NextFunction,
    Router as ExpressRouter,
    IRouter as IExpressRouter,
} from 'express';
import { Server } from 'http';

interface IApplication {
    start(): Promise<Server>;
    getLogger(): IDebugger;
    getPort(): number;
}

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
type ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => void;
type MiddlewareHandler = RequestHandler | ErrorHandler;

const getClassProperty = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];
const staticMiddleware = express.static;

interface IMiddleware {
    handlers: MiddlewareHandler[];
}

export {
    IDebugger, Express, Request, Response, NextFunction,
    ExpressRouter, IExpressRouter, IApplication,
    IMiddleware, MiddlewareHandler, RequestHandler, ErrorHandler,
    getClassProperty, staticMiddleware
};