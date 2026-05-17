import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const getSensorHistory = async (limit = 100) => {
  const response = await api.get(`/sensors/history?limit=${limit}`);
  return response.data;
};

export const getDevices = async () => {
  const response = await api.get('/devices');
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};

export const resolveAlert = async (id: string) => {
  const response = await api.post(`/alerts/${id}/resolve`);
  return response.data;
};

export const getThresholds = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const saveThresholds = async (thresholds: any) => {
  const response = await api.post('/settings', thresholds);
  return response.data;
};

export default api;
