import { apiBaseUrl } from '../config/apiConfig';

const notificationApiUrl = `${apiBaseUrl}/api/notification/`;

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    return token;
};

// Utility function to handle API responses
const handleApiResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
};

// Ensure `business_id={businessId}` in the URL
const buildNotificationApiUrl = (businessId, path = '') => `${notificationApiUrl}business_id=${businessId}${path}`;

// API client function for fetching notifications
export const fetchNotification = async (businessId) => {
    const token = getToken();
    const response = await fetch(buildNotificationApiUrl(businessId, '/get-notifications'), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await handleApiResponse(response);
    return Array.isArray(data.$values) ? data.$values : []; 
};