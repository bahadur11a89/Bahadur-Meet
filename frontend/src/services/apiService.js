import api from './api';

export const get = (url, params) => api.get(url, { params });

export const post = (url, data) => api.post(url, data);

export const put = (url, data) => api.put(url, data);

export const patch = (url, data) => api.patch(url, data);

export const del = (url) => api.delete(url);