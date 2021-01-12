import { Response } from 'express';
import UserService from '../services/UserService';
import { SessionRequest } from '../app/interfaces';
import { IServiceResult } from '../services/interfaces';
import TrackService from '../services/TrackService';
import { TITLE } from '../app/Const';
import { roles } from '../models/interfaces';

export default class AuthController {
    public static async reg(req: SessionRequest, res: Response) {
        let userName = req.body.username;
        let password = req.body.password;
        let result = await UserService.add(userName, password);
        return result.error ? res.status(400)
            .json(result) : res.status(201)
            .json(result);
    }

    public static async logIn(req: SessionRequest, res: Response) {
        let _username = req.body.username;
        let _password = req.body.password;
        let result: IServiceResult = await UserService.get(_username);
        const { error, data } = result;
        if (error) {
            return res.status(400).json(result);
        } else {
            if (data.password == _password) {
                req.session.logined = true;
                req.session.name = _username;
                return res.status(200).json({ error: false });
            } else {
                return res.status(400).json({ error: true, massage: 'Wrong password' });
            }
        }
    }

    public static async logOut(req: SessionRequest, res: Response) {
        if (req.session.logined) {
            req.session.logined = false;
        }
        return res.redirect('/');
    }

    public static async cabinet(req: SessionRequest, res: Response) {
        let username = req.session.name;
        let result: IServiceResult = await UserService.get(username);
        const { error, data } = result;
        let user = data;
        if (error) {
            return res.redirect('/');
        }
        switch (user.role) {
            case roles.user: {
                let userData = await TrackService.get(username);
                return res.render('cabinet', {
                    title: `${TITLE} Cabinet`,
                    logined: req.session.logined,
                    name: req.session.name,
                    role: user.role,
                    userData: userData
                });
            }
            case roles.manager: {
                let userData = await TrackService.get(username);
                let managerData = await TrackService.getAll();
                return res.render('cabinet', {
                    title: `${TITLE} Cabinet`,
                    logined: req.session.logined,
                    name: req.session.name,
                    role: user.role,
                    userData: userData,
                    managerData: managerData,

                });
            }
            case roles.admin: {
                let userData = await TrackService.get(username);
                let managerData = await TrackService.getAll();
                let adminData = await UserService.getAll();
                return res.render('cabinet', {
                    title: `${TITLE} Cabinet`,
                    logined: req.session.logined,
                    name: req.session.name,
                    role: user.role,
                    userData: userData,
                    managerData: managerData,
                    adminData: adminData
                });
            }
        }
    }
}