import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    role: string;
}

export interface IFigure extends Document {
    name: string;
    path: string;
    user: IUser;
}

export interface ITrack extends Document {
    status: string;
    figure: IFigure;
    user: IUser;
}