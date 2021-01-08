import mongoose, { Schema, Document} from 'mongoose';
import User from './user.model';
import Figure from './figure.model';

const TrackSchema: Schema = new Schema({
  status: { type: String, required: true },
  figure: { type: Schema, ref: 'Figure', required: true },
  user: { type: Schema, ref: 'User', required: true }
});

export default mongoose.model('Track', TrackSchema);