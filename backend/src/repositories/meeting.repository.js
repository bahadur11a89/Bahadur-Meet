import { Meeting } from '../models/meeting.model.js';

export const createMeeting = async (data) => {
    return await Meeting.create(data);
};

export const findMeetingById = async (id) => {
    return await Meeting.findById(id).populate('host', 'name email');
};

export const findMeetingByCode = async (code) => {
    return await Meeting.findOne({ meetingCode: code }).populate('host', 'name email');
};

export const findMeetingsByUser = async (userId) => {
    return await Meeting.find({ $or: [{ host: userId }, { participants: userId }] });
};

export const findMeetingsByUserPaginated = async (userId, { page = 1, limit = 10, search, status }) => {
    const query = { $or: [{ host: userId }, { participants: userId }] };
    if (status) query.status = status;
    if (search) query.topic = { $regex: search, $options: 'i' };

    const meetings = await Meeting.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('host', 'name email');

    const total = await Meeting.countDocuments(query);

    return { meetings, total };
};

export const addParticipant = async (meetingId, userId) => {
    return await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { participants: userId } }, { new: true });
};

export const removeParticipant = async (meetingId, userId) => {
    return await Meeting.findByIdAndUpdate(meetingId, { $pull: { participants: userId } }, { new: true });
};

export const endMeetingById = async (meetingId) => {
    return await Meeting.findByIdAndUpdate(meetingId, { status: 'ended', endedAt: new Date() }, { new: true });
};

export const updateMeetingStatus = async (meetingId, status) => {
    return await Meeting.findByIdAndUpdate(meetingId, { status }, { new: true });
};

export const updateMeetingById = async (meetingId, updateData) => {
    return await Meeting.findByIdAndUpdate(meetingId, updateData, { new: true });
};

export const deleteMeetingById = async (meetingId) => {
    return await Meeting.findByIdAndDelete(meetingId);
};

export const addToWaitingQueue = async (meetingId, userId) => {
    return await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { waitingQueue: userId } }, { new: true });
};

export const removeFromWaitingQueue = async (meetingId, userId) => {
    return await Meeting.findByIdAndUpdate(meetingId, { $pull: { waitingQueue: userId } }, { new: true });
};