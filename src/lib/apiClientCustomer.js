import { apiBaseUrl } from '../config/apiConfig';

const customerApiUrl = `${apiBaseUrl}/api/customer`;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Fetch customer ID by email or phone
export const fetchCustomerId = async (emailOrPhone) => {
  const findCustomerApiUrl = `${customerApiUrl}/find-customer`;
  const response = await fetch(findCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ EmailOrPhone: emailOrPhone }),
  });

  return await handleApiResponse(response);
};

// Fetch all customers
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

  return await handleApiResponse(response);
};

// Add a new customer
export const addCustomer = async (customerDetails) => {
  const response = await fetch(`${customerApiUrl}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerDetails),
  });
  return await handleApiResponse(response);
};

// Delete a customer
export const deleteCustomer = async (businessId, customerId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${customerApiUrl}/business_id=${businessId}/customer_id=${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await handleApiResponse(response);
};

// Update a customer
export const updateCustomer = async (businessId, customerId, customerDetails) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${customerApiUrl}/business_id=${businessId}/customer_id=${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(customerDetails),
  });

  return await handleApiResponse(response);
};

// Search customers by name
export const searchCustomersByName = async (name) => {
  const searchApiUrl = `${customerApiUrl}/search?name=${encodeURIComponent(name)}`;
  const response = await fetch(searchApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await handleApiResponse(response);

  if (data.customers && data.customers.$values) {
    return data.customers.$values;
  } else {
    return []; 
  }
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

  if (response.ok) {
    const data = await response.json();
    
    if (data.customerId) {
      return data.customerId; // Customer found
    } else {
      return null; // Customer not found
    }
  } else {
    // Handle any other unexpected response without throwing an error
    return null;
  }
};

//take customer id by phonenumber or mail
export const fetchCustomerByEmailOrPhone = async (emailOrPhone) => {
  const findCustomerApiUrl = `${customerApiUrl}/find-customer`;
  const response = await fetch(findCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ EmailOrPhone: emailOrPhone }),
  });

  const data = await response.json();
  return data.customerId;
};

//take customer id by phonenumber or mail
export const fetchCustomerByEmailOrPhoneAndBusinessId = async (emailOrPhone, businessId) => {
  const findCustomerApiUrl = `${customerApiUrl}/find-customer/business_id=${businessId}`;
  const response = await fetch(findCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ EmailOrPhone: emailOrPhone }),
  });

  const data = await response.json();
  return data;
};

// Fetch customers by business ID
export const fetchCustomersByBusinessId = async (businessId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${customerApiUrl}/business_id=${businessId}/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await handleApiResponse(response);
  
  // Ensure you extract the actual customer data from the $values array
  return data || [];
};

// Fetch a customer by their ID without authorization
export const fetchCustomerById = async (customerId) => {
  const customerDetailsApiUrl = `${apiBaseUrl}/api/customer/customer_id=${customerId}`;
  
  const response = await fetch(customerDetailsApiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await handleApiResponse(response);
};