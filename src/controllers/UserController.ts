import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';
import UserService from '../services/UserService';
import { IServiceResult } from '../services/interfaces';
import TrackService from '../services/TrackService';

export default class UserController {
    public static async changeRole(req: SessionRequest, res: Response) {
        let roleName = req.body.role;
        let name = req.params.name;
        let result:IServiceResult = await UserService.get(name);
        const {error, data} = result;
        let username = data.name;
        let password = data.password;
        if (error) {
            return res.json(result);
        } else {
            let result: IServiceResult = await UserService.update(username, password, roleName);
            return res.json(result);
        }
    }

    public static async changeStatus(req: SessionRequest, res: Response) {
        let statusName = req.body.status;
        let trackId = req.params.trackId;
        let result = await TrackService.update(trackId, statusName);
        return res.json(result);
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
        return res.json({error: out, message: outMessage})
    }
}