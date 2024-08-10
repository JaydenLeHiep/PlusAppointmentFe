import { apiBaseUrl } from '../config/apiConfig';

const businessApiUrl = `${apiBaseUrl}/api/business`;

// use this for production
//const userApiUrl = `https://plus-appointment.com/api/users`;

//API client function for Ownerdashboard
export const fetchBusinesses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`${businessApiUrl}/byUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch businesses');
    }

    const data = await response.json();

    if (Array.isArray(data)) {
        return data;
    } else if (data.$values) {
        return data.$values;
    } else {
        throw new Error('Unexpected data format');
    }
};

export const fetchBusinessesById = async (businessId) => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     throw new Error('User not authenticated');
    // }

    const response = await fetch(`${businessApiUrl}/business_id=${businessId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch businesses');
    }

    const data = await response.json();
    return data; // Adjust based on your API response structure
};