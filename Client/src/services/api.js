import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://securityflow.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
});

// Interceptor para actualizar el token en cada solicitud
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
