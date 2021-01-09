import * as mongoose from 'mongoose';
import { ITrack } from './interfaces';
import { FigureSchema } from './FigureModel';
import { UserSchema } from './UserModel';

export const TrackSchema: mongoose.Schema = new mongoose.Schema({
  status: { type: String, required: true },
  figure: { type: FigureSchema, ref: 'Figure', required: true },
  user: { type: UserSchema, ref: 'User', required: true }
});

export const TrackModel = mongoose.model('Track', TrackSchema);
export type ITrackModel = ITrack & Document;
