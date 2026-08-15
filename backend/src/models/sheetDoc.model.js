import mongoose from 'mongoose';
const { Schema } = mongoose;

const sheetDocSchema = new Schema({
  title: { type: String, required: true },
  gridData: { type: Schema.Types.Mixed, default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const SheetDoc = mongoose.model('SheetDoc', sheetDocSchema);
