import { IUserModel, UserModel } from '../models/UserModel';
import { IServiceResult } from './interfaces';
import { Model } from 'mongoose';

export default class UserService {

    public static async add(name: string, password: string, role: string, userModel: Model<any> = UserModel): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await userModel.create({name: name, password: password, role: role},
                function (err: any) {
                    if (err) resolve({error: true, message: err.message});
                    else resolve({error: false, message: "Saved successfully!"});
                });
            },
        );
    }

    public static async get(name: string, userModel: Model<any> = UserModel): Promise<IUserModel | IServiceResult> {
        let user = await this.findByName(name, userModel);
        if(user) return user;
        return { error: true, message: "the user is not found" };
    }

    public static async update(name: string, password: string, role: string, userModel: Model<any> = UserModel): Promise<IServiceResult> {
        let user = await this.findByName(name, userModel);
        if (user === null) {
            return { error: true, message: "the user is not found" }
        }
        return new Promise(async (resolve) => {
            await userModel.updateOne({ name: name }, { password: password, role: role })
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Update failed!" });
                    else resolve({ error: false, message: "Update successfully!" });
                });
        })
    }

    public static async findByName(name: string, userModel: Model<any> = UserModel): Promise<IUserModel | null> {
        return new Promise(async (resolve) => {
            await userModel.findOne({ 'name': name })
                .exec(function(err: any, user: IUserModel) {
                    if (err) resolve(null);
                    else resolve(user);
                    });
            },
        );
    }

    public static async getAll(userModel: Model<any> = UserModel): Promise<IUserModel[]> {
        return new Promise(async (resolve) => {
            await userModel.find()
                .exec(function(err: any, users: IUserModel[]) {
                    if (err) resolve(null);
                    else resolve(users);
                })
        })
    }

    public static async delete(name: string, userModel: Model<any> = UserModel): Promise<IServiceResult> {
        return new Promise(async (resolve) => {
            await userModel.deleteOne({ name: name})
                .exec(function(err: any) {
                    if (err) resolve({ error: true, message: "Delete failed!" });
                    else resolve({ error: false, message: "Delete successful!" });
                })
        })
    }
}
