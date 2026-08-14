import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageTypes = ['TEXT', 'IMAGE', 'FILE', 'SYSTEM'];

const attachmentSchema = new Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  name: { type: String },
  size: { type: Number },
}, { _id: false });

const messageSchema = new Schema({
  meetingId: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true,
    index: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // For private messages, this will be the recipient's ID.
  // For meeting messages, it will be null.
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  type: {
    type: String,
    enum: messageTypes,
    default: 'TEXT',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  attachments: {
    type: [attachmentSchema],
    default: [],
  },
  readBy: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
}, {
  timestamps: true,
});

// Compound index for performant querying and sorting of meeting chats.
messageSchema.index({ meetingId: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;