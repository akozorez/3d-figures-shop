import { UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';
import UserService from './UserService';
import { FigureModel, IFigureModel } from '../models/FigureModel';
import { Model } from "mongoose";
import { ITrackModel } from '../models/TrackModel';

export default class FigureService {
    public static async add(name: string, path: string, previewPath: string, userName: string, figureModel: Model<any> = FigureModel, userModel: Model<any> = UserModel): Promise<IServiceResult> {
        let user = await UserService.findByName(userName, userModel);
        return new Promise(async (resolve) => {
            await figureModel.create({name: name, path: path, previewPath: previewPath, user: user},
                function (err: any) {
                    if (err) resolve({error: true, message: err.message});
                    else resolve({error: false, message: "Saved successfully!"});
                });
            },
        );
    }

    public static async get(name: string, figureModel: Model<any> = FigureModel): Promise<IFigureModel | IServiceResult> {
        let figure = await this.findByName(name, figureModel);
        if (figure === null) {
            return { error: true, message: "the figure is not found" };
        }
        return figure;
    }

    public static async findByName(name: string, figureModel: Model<any> = FigureModel): Promise<IFigureModel | null> {
        return new Promise(async (resolve) => {
                await figureModel.findOne({ 'name': name })
                    .exec(function(err: any, figure: IFigureModel) {
                        if (err) resolve(null);
                        else resolve(figure);
                    });
            },
        );
    }

    public static async update(name: string, newName: string, path: string, previewPath: string, figureModel: Model<any> = FigureModel): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await figureModel.updateOne({ name: name }, { name: newName, path: path, previewPath: previewPath })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Update failed!" + err.message });
                    else resolve({ error: false, message: "Update successful!" });
                });
        })
    }

    public static async getAll(figureModel: Model<any> = FigureModel): Promise<IFigureModel[]> {
        return new Promise(async (resolve) => {
            await figureModel.find()
                .exec(function(err: any, figures: IFigureModel[]) {
                    if (err) resolve(null);
                    else resolve(figures);
                })
        })
    }

    public static async delete(name: string, figureModel: Model<any> = FigureModel): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await figureModel.deleteOne({ name: name})
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Delete failed!" });
                    else resolve({ error: false, message: "Delete successful!" });
                })
        })
    }
}