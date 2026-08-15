import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  category: { type: String, default: 'General' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  meeting: { type: Schema.Types.ObjectId, ref: 'Meeting' },
}, { timestamps: true });

noteSchema.index({ owner: 1, updatedAt: -1 });

export const Note = mongoose.model('Note', noteSchema);
