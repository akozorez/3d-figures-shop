import { UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';
import UserService from './UserService';
import FigureService from './FigureService';
import { ITrackModel, TrackModel } from '../models/TrackModel';

export default class TrackService {
    public static async add(userName: string, figureName: string, address: string): Promise<IServiceResult> {
        let user = await UserService.findByName(userName);
        let figure = await FigureService.findByName(figureName);
        let status = "Собирается";
        return new Promise(async (resolve) => {
            await TrackModel.create({status: status, address: address, figure: figure, user: user},
                function (err: any) {
                    if (err) resolve({error: true, message: err.message});
                    else resolve({error: false, message: "Saved successfully!"});
                });
            },
        );
    }

    public static async get(userName: string): Promise<ITrackModel | IServiceResult> {
        let user = await UserService.findByName(userName);
        let figure = TrackModel.find({ 'user': user });
        if (figure === null) {
            return { error: true, message: "the track is not found" };
        }
        return figure;
    }

    public static async update(id: string, status: string): Promise<IServiceResult> {
        let figure = await TrackModel.findById(id);
        if (figure === null) {
            return { error: true, message: "the track is not found" }
        }
        return new Promise(async (resolve) => {
            await UserModel.updateOne({ _id: id }, { status: status })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Update failed!" + err.message });
                    else resolve({ error: false, message: "Update successful!" });
                });
        })
    }

    public static async getAll(): Promise<ITrackModel[]> {
        return new Promise(async (resolve) => {
            await TrackModel.find()
                .exec(function(err: any, tracks: ITrackModel[]) {
                    if (err) resolve(null);
                    else resolve(tracks);
                })
        })
    }

    public static async delete(id: string): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await TrackModel.deleteOne({ _id: id})
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Delete failed!" + err.message });
                    else resolve({ error: false, message: "Delete successful!" });
                })
        })
    }
}