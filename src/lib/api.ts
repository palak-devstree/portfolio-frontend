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
  create: (data: any) => api.post('/api/v1/profile', data),
  update: (data: any) => api.put('/api/v1/profile', data),
  delete: () => api.delete('/api/v1/profile'),
  updateToggles: (toggles: Record<string, boolean>) => api.patch('/api/v1/profile/toggles', toggles),
};

export const projectsAPI = {
  list: () => api.get('/api/v1/projects'),
  get: (id: number) => api.get(`/api/v1/projects/${id}`),
  create: (data: any) => api.post('/api/v1/projects', data),
  update: (id: number, data: any) => api.put(`/api/v1/projects/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/projects/${id}`),
};

export const blogAPI = {
  list: () => api.get('/api/v1/blog'),
  get: (id: number) => api.get(`/api/v1/blog/${id}`),
  create: (data: any) => api.post('/api/v1/blog', data),
  update: (id: number, data: any) => api.put(`/api/v1/blog/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/blog/${id}`),
};

export const systemDesignsAPI = {
  list: () => api.get('/api/v1/system-designs'),
  get: (id: number) => api.get(`/api/v1/system-designs/${id}`),
  create: (data: any) => api.post('/api/v1/system-designs', data),
  update: (id: number, data: any) => api.put(`/api/v1/system-designs/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/system-designs/${id}`),
};

export const labAPI = {
  list: () => api.get('/api/v1/lab'),
  get: (id: number) => api.get(`/api/v1/lab/${id}`),
  create: (data: any) => api.post('/api/v1/lab', data),
  update: (id: number, data: any) => api.put(`/api/v1/lab/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/lab/${id}`),
};

export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/api/v1/auth/login', { username, password }),
};

export const dashboardAPI = {
  get: () => api.get('/api/v1/dashboard'),
  refresh: () => api.post('/api/v1/dashboard/refresh'),
};

export const chatbotAPI = {
  query: (query: string, sessionId: string) => 
    api.post('/api/v1/chatbot/query', { query, session_id: sessionId }),
  getDefaultQuestions: () => api.get('/api/v1/chatbot/default-questions'),
};

export const contactAPI = {
  send: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post('/api/v1/contact', data),
  list: (params?: { skip?: number; limit?: number; unread_only?: boolean }) =>
    api.get('/api/v1/admin/contact', { params }),
  get: (id: number) => api.get(`/api/v1/admin/contact/${id}`),
  update: (id: number, data: any) => api.put(`/api/v1/admin/contact/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/admin/contact/${id}`),
};

export const educationAPI = {
  list: () => api.get('/api/v1/education'),
  get: (id: number) => api.get(`/api/v1/education/${id}`),
  create: (data: any) => api.post('/api/v1/education', data),
  update: (id: number, data: any) => api.put(`/api/v1/education/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/education/${id}`),
};

export const certificatesAPI = {
  list: () => api.get('/api/v1/certificates'),
  get: (id: number) => api.get(`/api/v1/certificates/${id}`),
  create: (data: any) => api.post('/api/v1/certificates', data),
  update: (id: number, data: any) => api.put(`/api/v1/certificates/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/certificates/${id}`),
};

export const experienceAPI = {
  list: () => api.get('/api/v1/experience'),
  get: (id: number) => api.get(`/api/v1/experience/${id}`),
  create: (data: any) => api.post('/api/v1/experience', data),
  update: (id: number, data: any) => api.put(`/api/v1/experience/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/experience/${id}`),
};

export const uploadsAPI = {
  uploadImage: (file: File, imageType: 'diagram' | 'certificate' | 'education' | 'experience' | 'profile') => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/api/v1/uploads/image?image_type=${imageType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
