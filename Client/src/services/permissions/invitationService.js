// src/services/invitationService.js
import axios from 'axios';

const API_URL = 'https://securityflow.onrender.com/invitation'; // Cambia esto por la URL de tu backend

export const createUniqueInvitation = (invitationData) => {
    return axios.post(`${API_URL}/invitation/add/unique`, invitationData);
};

export const createMultipleInvitation = (invitationData) => {
    return axios.post(`${API_URL}/invitation/add/multiple`, invitationData);
};



export const revokeInvitation = (invitationId) => {
    return axios.delete(`${API_URL}/invitation/${invitationId}`); // Cambia esta ruta según tu backend
};


export const getInvitations = async (dates) => {
    try {
        const response = await axios.get(`${API_URL}/entry/by-date`, { data: dates });
        return response.data;
    } catch (error) {
        console.error("Error fetching invitations:", error);
        throw error;
    }
};