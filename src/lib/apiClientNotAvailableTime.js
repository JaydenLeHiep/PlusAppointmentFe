import { apiBaseUrl } from '../config/apiConfig';

const notAvailableTimeApiUrl = `${apiBaseUrl}/api/notavailabletime`;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Fetch all NotAvailableTimes for a specific staff
export const fetchNotAvailableTimes = async (businessId, staffId) => {
  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}/staff/${staffId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// Fetch all NotAvailableTimes for a specific business (all staff)
export const fetchNotAvailableTimesByBusiness = async (businessId) => {
  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// Fetch a specific NotAvailableTime by ID
export const fetchNotAvailableTimeById = async (businessId, staffId, notAvailableTimeId) => {
  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}/staff/${staffId}/notavailabletime/${notAvailableTimeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await handleApiResponse(response);
};

// Add a new NotAvailableTime
export const addNotAvailableTime = async (businessId, staffId, notAvailableTime) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}/staff/${staffId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(notAvailableTime),
  });

  return await handleApiResponse(response);
};

// Update an existing NotAvailableTime
export const updateNotAvailableTime = async (businessId, staffId, notAvailableTimeId, notAvailableTime) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}/staff/${staffId}/notavailabletime/${notAvailableTimeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(notAvailableTime),
  });
  return await handleApiResponse(response);
};

// Delete a NotAvailableTime
export const deleteNotAvailableTime = async (businessId, staffId, notAvailableTimeId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const response = await fetch(`${notAvailableTimeApiUrl}/business/${businessId}/staff/${staffId}/notavailabletime/${notAvailableTimeId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleApiResponse(response);
};