import * as mongoose from 'mongoose';
import { UserSchema } from './UserModel';
import { IFigure } from './interfaces';

export const FigureSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  path: { type: String, required: true },
  previewPath: { type: String, required: true },
  user: { type: UserSchema, required: true }
});

export const FigureModel = mongoose.model('Figure', FigureSchema);
export const FigureModelTest = mongoose.model('FigureTest', FigureSchema);
export type IFigureModel = IFigure & Document;
