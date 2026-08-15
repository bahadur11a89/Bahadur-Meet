import axios from 'axios';
import { API_URL, SOCKET_URL } from '../environment';

const apiBase = API_URL || (SOCKET_URL.endsWith('/api/v1') ? SOCKET_URL : `${SOCKET_URL}/api/v1`);
const api = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// API request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch and log Network Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error(`[API Network Error]: Unreachable server at ${apiBase}. Please check if the backend is running.`, error);
    }
    return Promise.reject(error);
  }
);

export default api;