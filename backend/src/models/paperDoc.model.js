import mongoose from 'mongoose';
const { Schema } = mongoose;

const paperDocSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const PaperDoc = mongoose.model('PaperDoc', paperDocSchema);
