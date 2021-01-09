import { IUserModel, UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';

export default class UserService {
    public static async add(name: string, password: string): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await UserModel.create({name: name, password: password},
                function (err: any) {
                    if (err) resolve({error: true, message: err.message});
                    else resolve({error: false, message: "Saved successfully!"});
                });
            },
        );
    }

    public static async get(name: string): Promise<IUserModel | IServiceResult> {
        let user = this.findByName(name);
        if (user === null) {
            return { error: true, message: "the user is not found" };
        }
        return user;
    }

    public static async update(name: string, password: string): Promise<IServiceResult> {
        let user = this.findByName(name);
        if (user === null) {
            return { error: true, message: "the user is not found" }
        }
        return new Promise(async (resolve) => {
            await UserModel.updateOne({ name: name }, { password: password })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Update failed!" });
                    else resolve({ error: false, message: "Update successful!" });
                });
        })
    }

    public static async findByName(name: string): Promise<IUserModel | null> {
        return new Promise(async (resolve, reject) => {
            await UserModel.findOne({ 'name': name })
                .exec(function(err: any, user: IUserModel) {
                    if (err) resolve(null);
                    else resolve(user);
                    });
            },
        );
    }

    public static async getAll(): Promise<IUserModel[]> {
        return new Promise(async (resolve) => {
            await UserModel.find()
                .exec(function(err: any, users: IUserModel[]) {
                    if (err) resolve(null);
                    else resolve(users);
                })
        })
    }

    public static async delete(name: string): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await UserModel.deleteOne({ name: name})
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Delete failed!" });
                    else resolve({ error: false, message: "Delete successful!" });
                })
        })
    }
}
