//import { apiBaseUrl } from '../config/apiConfig';

// const userApiUrl = `${apiBaseUrl}/api/users`;
// use this for production
const userApiUrl = `https://plus-appointment.com/api/users`;


export const registerUser = async (userDetails) => {
  const response = await fetch(`${userApiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(userDetails),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const loginUser = async (loginDetails) => {
  const response = await fetch(`${userApiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(loginDetails),
    credentials: 'include'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const refreshToken = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  

  const response = await fetch(`${userApiUrl}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
    credentials: 'include' // Ensure cookies are sent with the request
  });

  if (!response.ok) {
    console.log('Error refreshing token:', await response.text());
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  
  return data;
};
