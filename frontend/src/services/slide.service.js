import { get, post, put, del } from './apiService';

const API_URL = '/slides';

const getSlideDecks = () => get(API_URL);
const createSlideDeck = (data) => post(API_URL, data);
const updateSlideDeck = (id, data) => put(`${API_URL}/${id}`, data);
const deleteSlideDeck = (id) => del(`${API_URL}/${id}`);

export const slideService = {
  getSlideDecks,
  createSlideDeck,
  updateSlideDeck,
  deleteSlideDeck,
};
