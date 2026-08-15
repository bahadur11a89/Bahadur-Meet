import { get, post, del } from './apiService';

const API_URL = '/recordings';

const getAllRecordings = (params) => get(API_URL, params);
const getRecordingById = (id) => get(`${API_URL}/${id}`);
const createRecording = (data) => post(API_URL, data);
const deleteRecording = (id) => del(`${API_URL}/${id}`);

export const recordingService = {
  getAllRecordings,
  getRecordingById,
  createRecording,
  deleteRecording,
};
