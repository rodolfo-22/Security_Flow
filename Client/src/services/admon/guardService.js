import axiosInstance from '../api';

const API_URL = '/api/guards';

export const assignGuardRole = async (email) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/assign`, null, {
            params: { email }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGuards = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeGuardRole = async (userId) => { 
    try {
        const response = await axiosInstance.post(`${API_URL}/remove`, null, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/user/profile');
        return response.data;
        } catch (error) {
        throw error;
        }
    };
