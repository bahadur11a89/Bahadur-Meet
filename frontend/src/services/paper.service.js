import { get, post, put, del } from './apiService';

const API_URL = '/paper';

const getPaperDocs = () => get(API_URL);
const createPaperDoc = (data) => post(API_URL, data);
const updatePaperDoc = (id, data) => put(`${API_URL}/${id}`, data);
const deletePaperDoc = (id) => del(`${API_URL}/${id}`);

export const paperService = {
  getPaperDocs,
  createPaperDoc,
  updatePaperDoc,
  deletePaperDoc,
};
