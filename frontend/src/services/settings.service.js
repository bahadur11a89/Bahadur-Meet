import { get, put } from './apiService';

const API_URL = '/settings';

const getSecuritySettings = () => get(`${API_URL}/security`);
const getNotificationSettings = () => get(`${API_URL}/notifications`);
const updateNotificationSettings = (data) => put(`${API_URL}/notifications`, data);

export const settingsService = {
    getSecuritySettings,
    getNotificationSettings,
    updateNotificationSettings,
};