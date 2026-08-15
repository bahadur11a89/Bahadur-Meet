import mongoose from 'mongoose';
const { Schema } = mongoose;

const canvasDocSchema = new Schema({
  title: { type: String, required: true },
  canvasData: { type: Schema.Types.Mixed, default: {} },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const CanvasDoc = mongoose.model('CanvasDoc', canvasDocSchema);
