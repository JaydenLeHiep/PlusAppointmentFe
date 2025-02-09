import { apiBaseUrl } from '../config/apiConfig';

const serviceApiUrl = `${apiBaseUrl}/api/services`;

// use this for production
//const serviceApiUrl = `https://plus-appointment.com/api/service`;

// Utility function to get token and handle missing authentication
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  return token;
};

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Fetch all services for a business
export const fetchServices = async (businessId) => {
  const response = await fetch(`${serviceApiUrl}/businesses/${businessId}`, {
    method: 'GET',
  });
  const data = await handleApiResponse(response);
  if (Array.isArray(data)) {
    return data;
  } else if (data.$values) {
    return data.$values;
  } else {
    console.error('Unexpected data format:', data);
    throw new Error('Unexpected data format');
  }
};

// Add a new service
export const addService = async (businessId, serviceDetails) => {
  const token = getToken();
  const response = await fetch(`${serviceApiUrl}/businesses/${businessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceDetails)
  });
  return await handleApiResponse(response);
};

// Update an existing service
export const updateService = async (businessId, serviceId, serviceDetails) => {
  const token = getToken();
  const response = await fetch(`${serviceApiUrl}/businesses/${businessId}/services/${serviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceDetails)
  });
  return await handleApiResponse(response);
};

// Delete a service
export const deleteService = async (businessId, serviceId) => {
  const token = getToken();
  const response = await fetch(`${serviceApiUrl}/businesses/${businessId}/services/${serviceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return await handleApiResponse(response);
};

// Fetch all categories
export const fetchCategories = async () => {
  const response = await fetch(`${apiBaseUrl}/api/servicecategory`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await handleApiResponse(response);
  if (Array.isArray(data.$values)) {
    return data.$values;
  } else {
    console.error('Unexpected data format:', data);
    throw new Error('Unexpected data format');
  }
};