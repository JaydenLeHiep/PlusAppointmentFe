// src/lib/apiClientServices.js

import { apiBaseUrl } from '../config/apiConfig';

const serviceApiUrl = `${apiBaseUrl}/api/service`;

export const fetchServices = async (businessId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${serviceApiUrl}/business_id=${businessId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch services');
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

export const addService = async (businessId, serviceDetails) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${serviceApiUrl}/business_id=${businessId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceDetails)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add service');
  }
  return data;
};

export const deleteService = async (businessId, serviceId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${serviceApiUrl}/business_id=${businessId}/service_id=${serviceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to delete service');
  }

  return response.json();
};