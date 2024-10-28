import { apiBaseUrl } from '../config/apiConfig';

const notificationApiUrl = `${apiBaseUrl}/api/notification`;

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



// API client function for fetching notifications
export const fetchNotification = async (businessId) => {
  try {
      const token = getToken();
      const response = await fetch(`${notificationApiUrl}/business/${businessId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
      });
      const data = await handleApiResponse(response);
      return Array.isArray(data.$values) ? data.$values : []; 
  } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
  }
};


// API client function to mark notifications as seen
export const markNotificationsAsSeen = async (businessId, notificationIds) => {
  const token = getToken();
  
  const response = await fetch(`${notificationApiUrl}/mark-as-seen`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      businessId: businessId,
      notificationIds: notificationIds
    })
  });

  const data = await handleApiResponse(response);
  return data;
};
