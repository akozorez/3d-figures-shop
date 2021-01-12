import * as mongoose from 'mongoose';
import { IUser } from './interfaces';

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true }
});

export const UserModel = mongoose.model('User', UserSchema);
export const UserModelTest = mongoose.model('UserTest', UserSchema);
export type IUserModel = IUser & mongoose.Document;
