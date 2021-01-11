import { SessionRequest } from '../app/interfaces';
import { Response } from 'express';
import UserService from '../services/UserService';
import FigureService from '../services/FigureService';

export default class FigureController {
    public static async figures(req: SessionRequest, res: Response) {
        return res.status(200).json(FigureService.getAll());
    }
}
