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
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    
    if (Array.isArray(data)) {
        return data;
    } else if (data.$values) {
        return data.$values;
    } else {
        throw new Error('Unexpected data format');
    }
};

// Fetch service by ID
export const fetchServiceById = async (serviceId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated');
    }
  
    const response = await fetch(`${apiBaseUrl}/api/service/service_id=${serviceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  
    return data;
  };