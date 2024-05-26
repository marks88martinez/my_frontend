import axios from 'axios';
import { config } from './config';

// configuracion de api
const api = axios.create({
  baseURL: config.apiBaseUrl
});

export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (item) => api.post('/items', item);
export const updateItem = (id, item) => api.put(`/items/${id}`, item);
export const deleteItem = (id) => api.delete(`/items/${id}`);
