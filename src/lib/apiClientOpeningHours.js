import { apiBaseUrl } from '../config/apiConfig';

const openingHoursApiUrl = `${apiBaseUrl}/api/openinghours`;

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

// Fetch opening hours for a business
export const fetchOpeningHours = async (businessId) => {
  const response = await fetch(`${openingHoursApiUrl}/business_id=${businessId}`, {
    method: 'GET',
  });
  const data = await handleApiResponse(response);
  return data;
};

// Add new opening hours
export const addOpeningHours = async (businessId, openingHoursDetails) => {
  const token = getToken();
  const response = await fetch(`${openingHoursApiUrl}/business_id=${businessId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(openingHoursDetails)
  });
  return await handleApiResponse(response);
};

// Update existing opening hours
export const updateOpeningHours = async (businessId, openingHoursDetails) => {
  const token = getToken();
  const response = await fetch(`${openingHoursApiUrl}/business_id=${businessId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(openingHoursDetails)
  });
  return await handleApiResponse(response);
};

// Delete opening hours for a business
export const deleteOpeningHours = async (businessId) => {
  const token = getToken();
  const response = await fetch(`${openingHoursApiUrl}/business_id=${businessId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return await handleApiResponse(response);
};