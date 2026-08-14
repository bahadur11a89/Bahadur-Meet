import mongoose from 'mongoose';
const { Schema } = mongoose;

const presenceSchema = new Schema({
    status: { type: String, enum: ['online', 'offline', 'in-meeting', 'away'], default: 'offline' },
    lastSeen: { type: Date, default: Date.now },
    meetingId: { type: Schema.Types.ObjectId, ref: 'Meeting', default: null },
}, { _id: false });

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    token: { type: String },
    avatar: { type: String },
    presence: presenceSchema,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);