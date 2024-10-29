import { apiBaseUrl } from '../config/apiConfig';

const notAvailableDateApiUrl = `${apiBaseUrl}/api/notavailabledate`;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Fetch all NotAvailableDates for a specific staff
export const fetchNotAvailableDates = async (businessId, staffId) => {
  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}/staff/${staffId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// Fetch all NotAvailableDates for a specific business (all staff)
export const fetchNotAvailableDatesByBusiness = async (businessId) => {
  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// Fetch a specific NotAvailableDate by ID
export const fetchNotAvailableDateById = async (businessId, staffId, notAvailableDateId) => {
  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}/staff/${staffId}/notavailable/${notAvailableDateId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// Add a new NotAvailableDate
export const addNotAvailableDate = async (businessId, staffId, notAvailableDate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}/staff/${staffId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(notAvailableDate),
  });

  return await handleApiResponse(response);
};

// Update an existing NotAvailableDate
export const updateNotAvailableDate = async (businessId, staffId, notAvailableDateId, notAvailableDate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}/staff/${staffId}/notavailable/${notAvailableDateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(notAvailableDate),
  });

  return await handleApiResponse(response);
};

// Delete a NotAvailableDate
export const deleteNotAvailableDate = async (businessId, staffId, notAvailableDateId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${notAvailableDateApiUrl}/business/${businessId}/staff/${staffId}/notavailable/${notAvailableDateId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return await handleApiResponse(response);
};