import { get, post, put, del } from './apiService';

const API_URL = '/whiteboards';

const getWhiteboards = () => get(API_URL);
const createWhiteboard = (data) => post(API_URL, data);
const updateWhiteboard = (id, data) => put(`${API_URL}/${id}`, data);
const deleteWhiteboard = (id) => del(`${API_URL}/${id}`);

export const whiteboardService = {
  getWhiteboards,
  createWhiteboard,
  updateWhiteboard,
  deleteWhiteboard,
};
