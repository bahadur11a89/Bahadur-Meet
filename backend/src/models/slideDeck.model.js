import mongoose from 'mongoose';
const { Schema } = mongoose;

const slideDeckSchema = new Schema({
  title: { type: String, required: true },
  slides: { type: Schema.Types.Mixed, default: [{ title: 'Welcome Slide', content: 'Presentation content' }] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const SlideDeck = mongoose.model('SlideDeck', slideDeckSchema);
