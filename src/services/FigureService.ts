import { UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';
import UserService from './UserService';
import { FigureModel, IFigureModel } from '../models/FigureModel';

export default class FigureService {
    public static async add(name: string, path: string, userName: string): Promise<IServiceResult> {
        let user = await UserService.findByName(userName);
        return new Promise(async (resolve) => {
            await FigureModel.create({name: name, path: path, user: user},
                function (err: any) {
                    if (err) resolve({error: true, message: err.message});
                    else resolve({error: false, message: "Saved successfully!"});
                });
            },
        );
    }

    public static async get(name: string): Promise<IFigureModel | IServiceResult> {
        let figure = await this.findByName(name);
        if (figure === null) {
            return { error: true, message: "the figure is not found" };
        }
        return figure;
    }

    public static async findByName(name: string): Promise<IFigureModel | null> {
        return new Promise(async (resolve, reject) => {
                await FigureModel.findOne({ 'name': name })
                    .exec(function(err: any, figure: IFigureModel) {
                        if (err) resolve(null);
                        else resolve(figure);
                    });
            },
        );
    }

    public static async update(name: string, newName: string, path: string): Promise<IServiceResult> {
        let figure = await this.findByName(name);
        if (figure === null) {
            return { error: true, message: "the figure is not found" }
        }
        return new Promise(async (resolve) => {
            await UserModel.updateOne({ name: name }, { name: newName, path: path })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Update failed!" });
                    else resolve({ error: false, message: "Update successful!" });
                });
        })
    }

    public static async getAll(): Promise<IFigureModel[]> {
        return new Promise(async (resolve) => {
            await FigureModel.find()
                .exec(function(err: any, figures: IFigureModel[]) {
                    if (err) resolve(null);
                    else resolve(figures);
                })
        })
    }

    public static async delete(name: string): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await FigureModel.deleteOne({ name: name})
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Delete failed!" });
                    else resolve({ error: false, message: "Delete successful!" });
                })
        })
    }
}