import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { ERROR_VIEW, SERVER_SIDE_ERROR, TITLE } from '../app/Const';
import { SessionRequest } from '../app/interfaces';
import { IUserModel } from '../models/UserModel';
import { IServiceResult } from '../services/interfaces';

export default class AuthController {
    public static async reg(req: SessionRequest, res: Response) {
        let userName = req.body.userName;
        let password = req.body.password;
        console.log(userName);
        console.log(password);
        let result = await UserService.add(userName, password);
        console.log(result);
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

}