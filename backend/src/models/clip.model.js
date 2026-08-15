import mongoose from 'mongoose';
const { Schema } = mongoose;

const clipSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  url: { type: String, required: true },
  duration: { type: String, default: '1 min' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Clip = mongoose.model('Clip', clipSchema);
