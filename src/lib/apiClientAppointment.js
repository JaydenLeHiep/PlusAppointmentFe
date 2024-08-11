import { apiBaseUrl } from '../config/apiConfig';
const appointmentApiUrl = `${apiBaseUrl}/api/appointments`;

// use this for production
//const appointmentApiUrl = `https://plus-appointment.com/api/appointments`;

//Api appointments

export const fetchAppointments = async (businessId) => {
  if (!businessId) {
    throw new Error('Business ID is required');
  }

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
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch appointments');
  }
  
  const data = await response.json();
  return data.$values || data;
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
  console.log(data)
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};


// change the status of an appointment 
// change the status of an appointment 
export const changeStatusAppointments = async (appointmentId, status) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/appointment_id=${appointmentId}/status`;
  const response = await fetch(appointmentBusinessApiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),  // Ensure the payload is correctly formatted
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

// delete the appointment
export const deleteAppointment = async (appointmentId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/appointment_id=${appointmentId}`;
  const response = await fetch(appointmentBusinessApiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
};

// Function to fetch appointment details by ID
export const fetchAppointmentById = async (appointmentId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const response = await fetch(`${appointmentApiUrl}/appointment_id=${appointmentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;  
};

// Function to update an appointment
export const updateAppointment = async (appointmentId, updateData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }
  const response = await fetch(`${appointmentApiUrl}/appointment_id=${appointmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update appointment');
  }
  return response.json();
};
