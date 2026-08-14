import { get, del } from './apiService';

const API_URL = '/meetings/history';

const getMeetingHistory = (params) => get(API_URL, params);
const clearHistory = () => del(API_URL);

export const historyService = {
    getMeetingHistory,
    clearHistory,
};