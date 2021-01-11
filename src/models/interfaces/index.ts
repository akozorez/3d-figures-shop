import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    role: string;
}

export interface IFigure extends Document {
    name: string;
    path: string;
    previewPath: string;
    user: IUser;
}

export interface ITrack extends Document {
    status: string;
    address: string;
    figure: IFigure;
    user: IUser;
}

export enum statuses {
    'Going to', 'Assembled', 'Preparing to ship', 'Delivered', 'Received'
}

export type IStatusInterface = {
    [key in statuses]: boolean;
};