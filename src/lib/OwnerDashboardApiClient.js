// src/lib/apiClient.js

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/business`;

export const fetchBusinesses = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(apiUrl, {
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
