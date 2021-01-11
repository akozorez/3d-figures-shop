import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';
import UserService from '../services/UserService';
import { IServiceResult } from '../services/interfaces';
import TrackService from '../services/TrackService';

export default class UserController {
    public static async changeRole(req: SessionRequest, res: Response) {
        let roleName = req.body.role;
        let name = req.query.name;
        let result:IServiceResult = await UserService.get(<string>name);
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
        let trackId = req.query.trackId;
        let result = TrackService.update(<number><unknown>trackId, statusName);
        return res.json(result);
    }
}