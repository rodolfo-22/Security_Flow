import axiosInstance from './api';

const API_URL = '/user';


export const changeUsername = async (username) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/change-username/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeDui = async (dui) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/change-dui/${dui}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getUserRole = async () => {
  try {
      const response = await axiosInstance.get(`${API_URL}/get-role`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const checkUserRole = async (identifier) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/get-role`, {
      params: { identifier }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getUserRoleCode = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/get-role-code`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


