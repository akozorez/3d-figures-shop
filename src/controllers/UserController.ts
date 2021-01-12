import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';
import UserService from '../services/UserService';
import { IServiceResult } from '../services/interfaces';
import TrackService from '../services/TrackService';
import FigureService from '../services/FigureService';

export default class UserController {
    public static async changeRole(req: SessionRequest, res: Response) {
        let sign = req.body.sign;
        let name = req.params.name;
        let result: IServiceResult = await UserService.get(name);
        const { error } = result;
        if (error) {
            return res.json(result);
        } else {
            let result: IServiceResult = await UserService.updateRole(name, sign);
            return res.json(result);
        }
    }

    public static async changeStatus(req: SessionRequest, res: Response) {
        let trackId = req.params.trackId;
        let result = await TrackService.updateStatus(trackId);
        return res.status(200).json(result);
    }

    public static async postCart(req: SessionRequest, res: Response) {
        let address = req.body.address;
        let figuresName = req.body.figuresName;
        let username = req.session.name;
        let out: boolean;
        let outMessage: string = '';
        for (const figureName of figuresName) {
            let result = await TrackService.add(username, figureName, address);
            const { error, message } = result;
            if (error) {
                out = false;
                outMessage = message;
            }
        }
        return res.json({ error: out, message: outMessage });
    }

    public static async postUpload(req: SessionRequest, res: Response) {
        const file = req.file;
        if (file) {
            let figureName = req.body.name;
            let username = req.session.name;
            let previewPath = './img/3d.svg';
            let path = `./uploads/${req.file.filename}`;
            const added = await FigureService.add(figureName, path, previewPath, username);
            console.log(added);
            return res.redirect(`/model/${figureName}`);
        } else {
            return res.redirect('/models');
        }
    }

    public static async postCheckout(req: SessionRequest, res: Response) {
        let address = req.body.address;
        let figures: string[] = req.body.figures.split(',');
        console.log(figures);
        for await (const figure of figures) {
            await TrackService.add(req.session.name, figure, address);
        }
        return res.redirect('/cabinet');
    }
}