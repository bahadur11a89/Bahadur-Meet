import { get, post, del } from './apiService';

const API_URL = '/clips';

const getClips = () => get(API_URL);
const createClip = (data) => post(API_URL, data);
const deleteClip = (id) => del(`${API_URL}/${id}`);

export const clipService = {
  getClips,
  createClip,
  deleteClip,
};
