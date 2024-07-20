// customerApi.js

import { apiBaseUrl } from '../config/apiConfig';

const customerApiUrl = `${apiBaseUrl}/api/customer`;

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