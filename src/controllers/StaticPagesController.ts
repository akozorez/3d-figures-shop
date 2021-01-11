import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';

export default class StaticPagesController {
    public static async create(req: SessionRequest, res: Response) {
        return res.render('create');
    }
    public static async login(req: SessionRequest, res: Response) {
        return res.render('login');
    }

    public static async register(req: SessionRequest, res: Response) {
        return res.render('register');
    }

    public static async cart(req: SessionRequest, res: Response) {
        return res.render('cart');
    }

    public static async upload(req: SessionRequest, res: Response) {
        return res.render('upload');
    }

    public static async models(req: SessionRequest, res: Response) {
        return res.render('models');
    }
}