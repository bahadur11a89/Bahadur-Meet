import { get, post, put, del } from './apiService';

const API_URL = '/tasks';

const getTasks = (params) => get(API_URL, params);
const createTask = (data) => post(API_URL, data);
const updateTask = (id, data) => put(`${API_URL}/${id}`, data);
const deleteTask = (id) => del(`${API_URL}/${id}`);

export const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
