import { get, post, put, del } from './apiService';

const API_URL = '/sheets';

const getSheetDocs = () => get(API_URL);
const createSheetDoc = (data) => post(API_URL, data);
const updateSheetDoc = (id, data) => put(`${API_URL}/${id}`, data);
const deleteSheetDoc = (id) => del(`${API_URL}/${id}`);

export const sheetService = {
  getSheetDocs,
  createSheetDoc,
  updateSheetDoc,
  deleteSheetDoc,
};
