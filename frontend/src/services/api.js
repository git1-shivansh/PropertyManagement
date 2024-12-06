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

export const getOwnerProperties = async (ownerId) => {
    try {
        const response = await axios.get(`${API_URL}/owners/${ownerId}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching owner properties:', error);
        throw error;
    }
};

export const updateOwner = async (ownerId, ownerData) => {
    try {
        const response = await axios.put(`${API_URL}/owners/${ownerId}`, ownerData);
        return response.data;
    } catch (error) {
        console.error('Error updating owner:', error);
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

export const addRenter = async (renterData) => {
    try {
        const response = await axios.post(`${API_URL}/renters`, renterData);
        return response.data;
    } catch (error) {
        console.error('Error adding renter:', error);
        throw error;
    }
};

export const deleteRenter = async (renterId) => {
    try {
        const response = await axios.delete(`${API_URL}/renters/${renterId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting renter:', error);
        throw error;
    }
};