import { Request, Response } from 'express';
import { ERROR_VIEW, NOT_FOUND_ERROR, SERVER_SIDE_ERROR, TITLE } from '../app/Const';

export default class ErrorController {
    public static notFound(req: Request, res: Response) {
        return res.status(404).render(ERROR_VIEW, {
            title: `${TITLE} ${NOT_FOUND_ERROR}`,
            status: 404,
            message: NOT_FOUND_ERROR
        });
    }
    public static serverError(req: Request, res: Response) {
        return res.status(500).render(ERROR_VIEW, {
            title: `${TITLE} ${SERVER_SIDE_ERROR}`,
            status: 500,
            message: SERVER_SIDE_ERROR
        });
    }
}
