import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    password: string;
    role: number;
}

export interface IFigure extends Document {
    name: string;
    path: string;
    previewPath: string;
    user: IUser;
}

export interface ITrack extends Document {
    status: number;
    address: string;
    figure: IFigure;
    user: IUser;
}

export enum statuses {
    'Assembled', 'PreShip', 'Delivered', 'Received'
}

export enum roles {
    'user', 'manager', 'admin'
}


export type IStatusInterface = {
    [key in statuses]: boolean;
};