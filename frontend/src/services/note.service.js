import { get, post, put, del } from './apiService';

const API_URL = '/notes';

const getNotes = (search) => get(API_URL, search ? { search } : {});
const createNote = (data) => post(API_URL, data);
const updateNote = (id, data) => put(`${API_URL}/${id}`, data);
const deleteNote = (id) => del(`${API_URL}/${id}`);

export const noteService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
