import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const profileAPI = {
  get: () => api.get('/api/v1/profile'),
  create: (data: any) => api.post('/api/v1/admin/profile', data),
  update: (data: any) => api.put('/api/v1/admin/profile', data),
  delete: () => api.delete('/api/v1/admin/profile'),
};

export const projectsAPI = {
  list: () => api.get('/api/v1/projects'),
  get: (id: number) => api.get(`/api/v1/projects/${id}`),
  create: (data: any) => api.post('/api/v1/admin/projects', data),
  update: (id: number, data: any) => api.put(`/api/v1/admin/projects/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/admin/projects/${id}`),
};

export const blogAPI = {
  list: () => api.get('/api/v1/blog'),
  get: (id: number) => api.get(`/api/v1/blog/${id}`),
  create: (data: any) => api.post('/api/v1/admin/blog', data),
  update: (id: number, data: any) => api.put(`/api/v1/admin/blog/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/admin/blog/${id}`),
};

export const systemDesignsAPI = {
  list: () => api.get('/api/v1/system-designs'),
  get: (id: number) => api.get(`/api/v1/system-designs/${id}`),
  create: (data: any) => api.post('/api/v1/admin/system-designs', data),
  update: (id: number, data: any) => api.put(`/api/v1/admin/system-designs/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/admin/system-designs/${id}`),
};

export const labAPI = {
  list: () => api.get('/api/v1/lab'),
  get: (id: number) => api.get(`/api/v1/lab/${id}`),
  create: (data: any) => api.post('/api/v1/admin/lab', data),
  update: (id: number, data: any) => api.put(`/api/v1/admin/lab/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/admin/lab/${id}`),
};

export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/api/v1/auth/login', { username, password }),
};

export const dashboardAPI = {
  get: () => api.get('/api/v1/dashboard'),
};

export const chatbotAPI = {
  query: (query: string, sessionId: string) => 
    api.post('/api/v1/chatbot/query', { query, session_id: sessionId }),
};

export const contactAPI = {
  send: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post('/api/v1/contact', data),
};
