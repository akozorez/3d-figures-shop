import mongoose, { Schema, Document} from 'mongoose';
import User from './user.model';

const FigureSchema: Schema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  user: { type: Schema, ref: 'User', required: true }
});

export default mongoose.model('Figure', FigureSchema);