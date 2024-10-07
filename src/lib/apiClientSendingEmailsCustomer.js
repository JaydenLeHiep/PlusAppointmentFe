import { apiBaseUrl } from '../config/apiConfig';

const sendingEmailsCustomerApiUrl = `${apiBaseUrl}/api/sendingemail/send-bulk`;

// Utility function to handle API responses
const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
};

// Send bulk emails
export const sendBulkEmail = async (bulkEmail) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(sendingEmailsCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bulkEmail),
  });

  return await handleApiResponse(response);
};
