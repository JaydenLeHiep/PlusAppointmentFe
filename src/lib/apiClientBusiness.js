import { apiBaseUrl } from '../config/apiConfig';

const businessApiUrl = `${apiBaseUrl}/api/businesses`;

// use this for production
//const businessApiUrl = `https://plus-appointment.com/api/business`;

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

    const response = await fetch(`${businessApiUrl}/${businessId}`, {
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

export const fetchBusinessesByName = async (businessName) => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     throw new Error('User not authenticated');
    // }

    const response = await fetch(`${businessApiUrl}/${businessName}/booking`, {
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