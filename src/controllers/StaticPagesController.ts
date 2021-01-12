import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';
import { TITLE } from '../app/Const';
import FigureService from '../services/FigureService';

export default class StaticPagesController {

    public static async create(req: SessionRequest, res: Response) {
        return res.render('create', {
            title: `${TITLE} Create a model`,
            logined: req.session.logined,
            name: req.session.name,
        });
    }

    public static async login(req: SessionRequest, res: Response) {
        return res.render('login', {
            title: `${TITLE} Login page`,

        });
    }

    public static async register(req: SessionRequest, res: Response) {
        return res.render('register', {
            title: `${TITLE} Register page`,
        });
    }

    public static async cart(req: SessionRequest, res: Response) {
        return res.render('cart', {
            title: `${TITLE} Cart page`,
            logined: req.session.logined,
            name: req.session.name,
        });
    }

    public static async checkout(req: SessionRequest, res: Response) {
        return res.render('checkout', {
            title: `${TITLE} Checkout`,
            logined: req.session.logined,
            name: req.session.name,
        });
    }

    public static async upload(req: SessionRequest, res: Response) {
        return res.render('upload', {
            title: `${TITLE} Upload a model`,
            logined: req.session.logined,
            name: req.session.name,
        });
    }

    public static async models(req: SessionRequest, res: Response) {
        const find = await FigureService.getAll();
        return res.render('models', {
            title: `${TITLE} Models`,
            logined: req.session.logined,
            name: req.session.name,
            models: find
        });
    }

    public static async model(req: SessionRequest, res: Response) {
        const find = await FigureService.get(req.params.name);
        console.log(find);
        if (find.error) {
            return res.redirect('/models');
        }
        return res.render('model', {
            title: `${TITLE} Model ${find.data.name}`,
            logined: req.session.logined,
            name: req.session.name,
            model: find.data,
        });
    }
}