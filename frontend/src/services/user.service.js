import { get } from './apiService';

const getContacts = (search) => get('/users/contacts', search ? { search } : {});
const getCurrentUserProfile = () => get('/users/me');

export const userService = {
  getContacts,
  getCurrentUserProfile,
};
