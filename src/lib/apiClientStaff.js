//import { apiBaseUrl } from '../config/apiConfig';

//const staffApiUrl = `${apiBaseUrl}/api/staff`;

// use this for production
const staffApiUrl = `https://plus-appointment.com/api/staff`;
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

// Function to build API URL
const buildStaffApiUrl = (businessId, path = '') => `${staffApiUrl}/business_id=${businessId}${path}`;

// API client function for fetching staff
export const fetchStaff = async (businessId) => {
  const token = getToken();
  const response = await fetch(buildStaffApiUrl(businessId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
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

// API client function for adding a new staff member
export const addStaff = async (businessId, staffDetails) => {
  const token = getToken();
  const response = await fetch(buildStaffApiUrl(businessId, '/add'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(staffDetails)
  });

  return await handleApiResponse(response);
};

// API client function for deleting a staff member
export const deleteStaff = async (businessId, staffId) => {
  const token = getToken();
  const response = await fetch(buildStaffApiUrl(businessId, `/staff_id=${staffId}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return await handleApiResponse(response);
};

// API client function for updating a staff member
export const updateStaff = async (businessId, staffId, staffDetails) => {
  const token = getToken();
  const response = await fetch(buildStaffApiUrl(businessId, `/staff_id=${staffId}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(staffDetails)
  });

  return await handleApiResponse(response);
};
