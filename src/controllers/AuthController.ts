import { Response } from 'express';
import UserService from '../services/UserService';
import { SessionRequest } from '../app/interfaces';
import { IServiceResult } from '../services/interfaces';
import TrackService from '../services/TrackService';

export default class AuthController {
    public static async reg(req: SessionRequest, res: Response) {
        let userName = req.body.userName;
        let password = req.body.password;
        let result = await UserService.add(userName, password);
        if (result.error) {
            return res.status(400)
                .json(result);
        }
        return res.status(201)
            .json(result);
    }

    public static async logIn(req: SessionRequest, res: Response) {
        let _username = req.body.username;
        let _password = req.body.password;
        let result:IServiceResult = await UserService.get(_username);
        const {error, data} = result;
        if (error) {
            return res.status(400).json(result);
        } else {
            if (data.password == _password) {
                req.session.logined = true;
                req.session.name = _username;
                return res.redirect('/');
            } else {
                return res.status(400).json({error: true, massage: 'Wrong password'})
            }
        }
    }

    public static async logOut(req: SessionRequest, res: Response) {
        let _username = req.body.username;
        req.session.logined = false;
        req.session.name = _username;
        return res.redirect('/');
    }

    public static async cabinet(req: SessionRequest, res: Response) {
        let username = req.session.name;
        let result:IServiceResult = await UserService.get(username);
        const {error, data} = result;
        let user = data;
        if (error) {
            return res.redirect('/');
        }
        switch (user.role) {
            case 'user': {
                let data = TrackService.get(username);
                return res.json(data).render(`views/${user.role}.cabinet`);
            }
            case 'admin': {
                let data = UserService.getAll();
                return res.json(data).render(`views/${user.role}.cabinet`);
            }
            case 'manager': {
                let data = TrackService.getAll();
                return res.json(data).render(`views/${user.role}.cabinet`);
            }
        }
    }
}