import mongoose from 'mongoose';
const { Schema } = mongoose;

const recordingSchema = new Schema({
  title: { type: String, required: true },
  meeting: { type: Schema.Types.ObjectId, ref: 'Meeting' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  storageUrl: { type: String, required: true },
  duration: { type: String, default: '30 mins' },
  size: { type: String, default: '150 MB' },
  type: { type: String, enum: ['Cloud', 'Local'], default: 'Cloud' },
}, { timestamps: true });

recordingSchema.index({ owner: 1, createdAt: -1 });

export const Recording = mongoose.model('Recording', recordingSchema);
