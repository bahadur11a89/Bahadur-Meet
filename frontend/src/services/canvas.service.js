import { get, post, put, del } from './apiService';

const API_URL = '/canvas';

const getCanvasDocs = () => get(API_URL);
const createCanvasDoc = (data) => post(API_URL, data);
const updateCanvasDoc = (id, data) => put(`${API_URL}/${id}`, data);
const deleteCanvasDoc = (id) => del(`${API_URL}/${id}`);

export const canvasService = {
  getCanvasDocs,
  createCanvasDoc,
  updateCanvasDoc,
  deleteCanvasDoc,
};
