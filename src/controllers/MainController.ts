import { Response } from 'express';
import { TITLE } from '../app/Const';
import { SessionRequest } from '../app/interfaces';

export default class MainController {
    public static index(req: SessionRequest, res: Response) {
        return res.render('main/index', {
            title: `${TITLE} Create a model`,
            logined: req.session.logined,
            name: req.session.name
        });
    }
}
