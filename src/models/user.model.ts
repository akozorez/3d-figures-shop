import mongoose, { Schema, Document} from 'mongoose';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);