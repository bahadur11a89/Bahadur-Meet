import mongoose from 'mongoose';
const { Schema } = mongoose;

const whiteboardSchema = new Schema({
  title: { type: String, required: true },
  canvasData: { type: Schema.Types.Mixed, default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

whiteboardSchema.index({ owner: 1, updatedAt: -1 });

export const Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);
