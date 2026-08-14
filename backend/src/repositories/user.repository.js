import { User } from "../models/user.model.js";

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

export const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

export const findUserByToken = async (token) => {
    return await User.findOne({ token });
};

export const updateUserById = async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
};

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

export const updatePresenceStatus = async (userId, status, meetingId = null) => {
    return User.findByIdAndUpdate(userId, {
        'presence.status': status,
        'presence.meetingId': meetingId,
        'presence.lastSeen': new Date(),
    });
};

export const updateLastSeen = async (userId) => {
    return User.findByIdAndUpdate(userId, { 'presence.lastSeen': new Date() });
};