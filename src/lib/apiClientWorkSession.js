import { apiBaseUrl } from '../config/apiConfig';

const workSessionApiUrl = `${apiBaseUrl}/api/worksessions`;

const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Get all work sessions
export const fetchAllWorkSessions = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleApiResponse(response);
};

// Get all work sessions by business
export const fetchWorkSessionsByBusiness = async (businessId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}/business/${businessId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleApiResponse(response);
};

// Get a specific work session by ID
export const fetchWorkSessionById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleApiResponse(response);
};

// Create a new work session
export const createWorkSession = async (sessionData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });
  return await handleApiResponse(response);
};

// Update an existing work session
export const updateWorkSession = async (id, sessionData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(sessionData),
  });
  return await handleApiResponse(response);
};

// Delete a work session
export const deleteWorkSession = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${workSessionApiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await handleApiResponse(response);
};