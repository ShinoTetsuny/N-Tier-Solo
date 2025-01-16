import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const publicationService = {
  getAll: () => api.get('/publications/'),
  create: (data) => api.post('/publications/', data),
  update: (id, data) => api.put(`/publications/${id}`, data),
  delete: (id) => api.delete(`/publications/${id}`)
};

export const userService = {
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      authService.setToken(response.data.token);
    }
    return response;
  },
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    if (response.data.token) {
      authService.setToken(response.data.token);
    }
    return response;
  },
  logout: () => {
    authService.removeToken();
  }
};

export default api; 