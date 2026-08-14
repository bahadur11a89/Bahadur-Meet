import {
    findUserById,
    updateUserById,
    deleteUserById,
} from "../repositories/user.repository.js";

export const getUserProfile = async (userId) => {
    return await findUserById(userId);
};

export const updateUserProfile = async (userId, data) => {
    return await updateUserById(userId, data);
};

export const removeUser = async (userId) => {
    return await deleteUserById(userId);
};