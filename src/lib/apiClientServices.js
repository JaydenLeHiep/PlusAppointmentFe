import { apiBaseUrl } from '../config/apiConfig';




export const fetchService = async (businessId) => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     throw new Error('User not authenticated');
    // }
    const serviceApiUrl = `${apiBaseUrl}/api/service/business_id=${businessId}`;
    const response = await fetch(serviceApiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch service');
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