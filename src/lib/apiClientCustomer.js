// customerApi.js

import { apiBaseUrl } from '../config/apiConfig';

const customerApiUrl = `${apiBaseUrl}/api/customer`;

// use this for production
//const customerApiUrl = `https://plus-appointment.com/api/customer`;

export const fetchCustomerId = async (emailOrPhone) => {
  const findCustomerApiUrl = `${customerApiUrl}/find-customer`;
  const response = await fetch(findCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ EmailOrPhone: emailOrPhone })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.customerId;
};

// Fetch customers
export const fetchCustomers = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(customerApiUrl, {
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

  if (Array.isArray(data)) {
    return data;
  } else if (data.$values) {
    return data.$values;
  } else {
    throw new Error('Unexpected data format');
  }
};


// for add customer
export const addCustomer = async (customerDetails) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${customerApiUrl}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerDetails),
  });

  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const searchCustomersByName = async (name) => {
  const searchApiUrl = `${customerApiUrl}/search?name=${encodeURIComponent(name)}`;
  const response = await fetch(searchApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to search customers');
  }

  // Extract the customers from the response
  const customers = data.customers?.$values || [];

  // Return the customers array directly
  return customers;
};

// Function to check if a customer exists based on email or phone
export const checkCustomerExists = async (emailOrPhone) => {
  const checkCustomerUrl = `${customerApiUrl}/find-customer`;
  const response = await fetch(checkCustomerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ EmailOrPhone: emailOrPhone }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to check customer existence');
  }

  return data.customerId;
};

//take customer id by phonenumber or mail
export const fetchCustomerByEmailOrPhone = async (emailOrPhone) => {
  const findCustomerApiUrl = `${customerApiUrl}/find-customer-by-name-or-phone?nameOrPhone=${encodeURIComponent(emailOrPhone)}`;
  const response = await fetch(findCustomerApiUrl, {
    method: 'GET', // Use GET as per the backend implementation
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Get the text response to check what went wrong
    throw new Error(errorMessage || 'Failed to fetch customer ID');
  }

  const data = await response.json();
  return data.customerId;
};