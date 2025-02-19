import { apiBaseUrl } from '../config/apiConfig';
import moment from 'moment';
const appointmentApiUrl = `${apiBaseUrl}/api/appointments`;

// use this for production
//const appointmentApiUrl = `https://plus-appointment.com/api/appointments`;

//Api appointments

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

export const fetchAppointments = async (businessId) => {
  if (!businessId) {
    throw new Error('Business ID is required');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const appointmentBusinessApiUrl = `${appointmentApiUrl}/businesses/${businessId}/appointments`;
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
  const response = await fetch(`${appointmentApiUrl}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/${appointmentId}/status`;
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
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/${appointmentId}`;
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
  const response = await fetch(`${appointmentApiUrl}/${appointmentId}`, {
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
  const response = await fetch(`${appointmentApiUrl}/${appointmentId}/`, {
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

// Fetch not available time slots for a specific staff member and date
export const fetchNotAvailableTimeSlots = async (staffId, date) => {
  if (!staffId || !date) {
    throw new Error('Staff ID and date are required');
  }

  // Use moment to format the date consistently
  const formattedDate = moment(date).format('YYYY-MM-DD');

  // Make the API request with staffId in the URL and date as a query parameter
  const response = await fetch(`${appointmentApiUrl}/staff/${staffId}/not-available-timeslots?date=${formattedDate}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch not available time slots');
  }

  const data = await response.json();

  // Check if availableTimeSlots exists and is an array
  if (data && Array.isArray(data.availableTimeSlots.$values)) {
    return data.availableTimeSlots.$values;
  } else {
    return []; // Return an empty array if not an array
  }
};

// Fetch appointments by customer ID
export const fetchAppointmentsByCustomerId = async (customerId) => {
  const response = await fetch(`${apiBaseUrl}/api/appointments/customers/${customerId}/appointments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleApiResponse(response);
};

// delete the appointment for the customer 
export const deleteAppointmentForCustomer = async (appointmentId) => {
  const appointmentBusinessApiUrl = `${appointmentApiUrl}/${appointmentId}`;
  const response = await fetch(appointmentBusinessApiUrl, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
};
