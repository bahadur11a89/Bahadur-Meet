import { get, patch } from './apiService';

const API_URL = '/profile';

const getMyProfile = () => get(API_URL);
const updateMyProfile = (profileData) => patch(API_URL, profileData);

export const profileService = {
    getMyProfile,
    updateMyProfile,
};