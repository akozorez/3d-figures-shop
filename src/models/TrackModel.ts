import * as mongoose from 'mongoose';
import { ITrack, statuses } from './interfaces';
import { FigureSchema } from './FigureModel';
import { UserSchema } from './UserModel';

export const TrackSchema: mongoose.Schema = new mongoose.Schema({
  status: { type: String ,required: true },
  address: {type: String, required: true},
  figure: { type: FigureSchema, required: true },
  user: { type: UserSchema, required: true }
});

export const TrackModel = mongoose.model('Track', TrackSchema);
export const TrackModelTest = mongoose.model('TrackTest', TrackSchema);
export type ITrackModel = ITrack & Document;
