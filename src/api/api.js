import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Uses Vite proxy to forward to backend
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('pas_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/me');
export const submitApplication = (fields) => API.post('/applications', fields, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getMyApplications = () => API.get('/applications');
export const getApplicationDetail = (id) => API.get(`/applications/${id}`);
export const getAdminApplications = () => API.get('/admin/applications');
export const updateApplication = (id, data) => API.patch(`/admin/applications/${id}`, data);
export default API;
