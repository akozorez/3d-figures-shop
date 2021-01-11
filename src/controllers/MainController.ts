import { Request, Response } from 'express';
import { TITLE } from '../app/Const';
import ErrorController from './ErrorController';

export default class MainController {
    public static index(req: Request, res: Response) {
        return res.render('main/index', { title: TITLE });
    }

    public static test(req: Request, res: Response) {
        try {
            throw new Error('test');
        } catch (e) {
            return ErrorController.serverError(req, res);
        }
    }
}
