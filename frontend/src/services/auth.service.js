import { post } from './apiService';

const API_URL = '/auth';

const login = (credentials) => post(`${API_URL}/login`, credentials);
const register = (userData) => post(`${API_URL}/register`, userData);
const refreshToken = () => post(`${API_URL}/refresh-token`);

export const authService = {
    login,
    register,
    refreshToken,
};