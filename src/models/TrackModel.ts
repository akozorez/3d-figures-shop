import * as mongoose from 'mongoose';
import { ITrack } from './interfaces';

export const TrackSchema: mongoose.Schema = new mongoose.Schema({
    status: { type: Number, required: true },
    address: { type: String, required: true },
    figureName: { type: String, ref: 'Figure', required: true },
    userName: { type: String, ref: 'User', required: true },
});

export const TrackModel = mongoose.model('Track', TrackSchema);
export const TrackModelTest = mongoose.model('TrackTest', TrackSchema);
export type ITrackModel = ITrack & Document;
