// src/services/invitationService.js
import axios from 'axios';
import { getToken } from '../authService';

const BASE_URL = 'https://securityflow.onrender.com/invitation';
const GET_INVITATIONS_URL = `${BASE_URL}/get/invitations`;
const GET_INVITATIONS_INFO_URL = `${BASE_URL}/get/invitations-info`;

export const getInvitations = async () => {
    const token = getToken();
    try {
        const response = await axios.get(GET_INVITATIONS_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getInvitationInfo = async () => {
    const token = getToken();
    try {
        const response = await axios.get(GET_INVITATIONS_INFO_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
