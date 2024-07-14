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
