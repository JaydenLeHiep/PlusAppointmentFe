import { apiBaseUrl } from '../config/apiConfig';

const businessApiUrl = `${apiBaseUrl}/api/business/byUser`;
const userApiUrl = `${apiBaseUrl}/api/users`;

const appointmentApiUrl = `${apiBaseUrl}/api/appointments`;

//API client function for Ownerdashboard
export const fetchBusinesses = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(businessApiUrl, {
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

//API client function for registering a user
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

//API client function for Login
export const loginUser = async (loginDetails) => {
  const response = await fetch(`${userApiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDetails),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};



//Api appointments

export const fetchAppointments = async (businessId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/business/business_id=${businessId}`;
  const response = await fetch(appointmentBusinessApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch appointments');
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


// for add Appointment
export const addAppointment = async (appointmentDetails) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${appointmentApiUrl}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentDetails),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add appointment');
  }
  return data;
};