import { UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';
import UserService from './UserService';
import FigureService from './FigureService';
import { ITrackModel, TrackModel } from '../models/TrackModel';
import { Model } from 'mongoose';
import { FigureModel } from '../models/FigureModel';
import { statuses } from '../models/interfaces';

export default class TrackService {
    public static async add(userName: string, figureName: string, address: string, trackModel: Model<any> = TrackModel, figureModel: Model<any> = FigureModel, userModel: Model<any> = UserModel): Promise<IServiceResult> {
        let user = await UserService.findByName(userName, userModel);
        let figure = await FigureService.findByName(figureName, figureModel);
        let status = statuses.Assembled;
        return new Promise(async (resolve) => {
                await trackModel.create({ status: status, address: address, figureName: figure.name, userName: user.name },
                    function(err: any) {
                        if (err) resolve({ error: true, message: err.message });
                        else resolve({ error: false, message: 'Saved successfully!' });
                    });
            },
        );
    }

    public static async get(userName: string, trackModel: Model<any> = TrackModel, userModel: Model<any> = UserModel): Promise<ITrackModel[]> {
        let user = await UserService.findByName(userName, userModel);
        let figures = trackModel.find({ userName: user.name });
        if (figures === null) {
            return [];
        }
        return figures;
    }

    public static async update(id: any, status: statuses, trackModel: Model<any> = TrackModel): Promise<IServiceResult> {
        if (await trackModel.findById(id) === null)
            return { error: true, message: 'the track is not found' };
        return new Promise(async (resolve) => {
            await trackModel.updateOne({ _id: id }, { status: status })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: 'Update failed!' + err.message });
                    else resolve({ error: false, message: 'Update successful!' });
                });
        });
    }

    public static async updateStatus(id: any, trackModel: Model<any> = TrackModel): Promise<IServiceResult> {
        let track = await trackModel.findById(id);
        if (track === null) {
            return { error: true, message: 'the track is not found' };
        }
        return new Promise(async (resolve) => {
            if (track.status < statuses.Received) {
                await trackModel.updateOne({ _id: id }, { status: track.status + 1 })
                    .exec(function(err: any) {
                        if (err) resolve({ error: true, message: 'Update failed!' + err.message });
                        else resolve({ error: false, message: 'Update successful!' });
                    });
            } else {
                resolve({ error: true, message: 'Update failed!' });
            }
        });

    }

    public static async getAll(trackModel: Model<any> = TrackModel): Promise<ITrackModel[]> {
        return new Promise(async (resolve) => {
            await trackModel.find()
                .exec(function(err: any, tracks: ITrackModel[]) {
                    if (err) resolve(null);
                    else resolve(tracks);
                });
        });
    }

    public static async delete(id: number, trackModel: Model<any> = TrackModel): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await trackModel.deleteOne({ _id: id })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: 'Delete failed!' + err.message });
                    else resolve({ error: false, message: 'Delete successful!' });
                });
        });
    }
}