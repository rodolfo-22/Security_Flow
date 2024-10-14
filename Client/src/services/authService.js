import axios from 'axios';

export const getToken = () => {
    return localStorage.getItem('access_token');
  };
  
  export const setToken = (token) => {
    localStorage.setItem('access_token', token);
  };
  
  export const removeToken = () => {
    localStorage.removeItem('access_token');
  };

// Asegúrate de que el token se adjunte a todas las solicitudes de Axios
axios.interceptors.request.use(
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


  
const API_URL = 'https://securityflow.onrender.com/auth';

const checkUserExists = async (identifier) => {
  try {
      const response = await axios.get(`${API_URL}/exists/${identifier}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

const registerUser = async (registerInfo) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (loginInfo) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginInfo);
    if (response.data.token) {
      setToken(response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('picture', response.data.picture);
      localStorage.setItem('houseNumber', response.data.houseNumber);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  checkUserExists,
  loginUser,
  registerUser,
};
