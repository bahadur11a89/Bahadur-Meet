import { get } from './apiService';

const API_URL = '/dashboard';

const getSummary = () => get(API_URL);

export const dashboardService = {
    getSummary,
};