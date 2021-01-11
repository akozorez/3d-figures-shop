import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { ERROR_VIEW, SERVER_SIDE_ERROR, TITLE } from '../app/Const';

export default class AuthController {
    public static async reg(req: Request, res: Response) {
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

    public static async logIn(req: Request, res: Response) {

    }

    public static async logOut(req: Request, res: Response) {

    }

}