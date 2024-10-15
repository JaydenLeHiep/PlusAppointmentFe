import { apiBaseUrl } from '../config/apiConfig';

const emailContentApiUrl = `${apiBaseUrl}/api/emailcontent`;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Fetch all email contents
export const fetchEmailContents = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(emailContentApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await handleApiResponse(response);
  // Extract the $values array from the response
  return data?.$values || [];
};