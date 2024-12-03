import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getProperties = async () => {
    try {
        const response = await axios.get(`${API_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
};

export const getOwners = async () => {
    try {
        const response = await axios.get(`${API_URL}/owners`);
        return response.data;
    } catch (error) {
        console.error('Error fetching owners:', error);
        throw error;
    }
};

export const getRenters = async () => {
    try {
        const response = await axios.get(`${API_URL}/renters`);
        return response.data;
    } catch (error) {
        console.error('Error fetching renters:', error);
        throw error;
    }
};