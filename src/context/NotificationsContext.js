import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchNotification as apiFetchNotification } from '../lib/apiClientNotification';

// Create a context for notifications
const NotificationsContext = createContext();

// Custom hook to use the context
export const useNotificationsContext = () => useContext(NotificationsContext);

// NotificationsProvider component to provide state and functions
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  // Fetch all notifications
  const fetchAllNotifications = useCallback(async (businessId) => {
    try {
      const notificationList = await apiFetchNotification(String(businessId)); // Ensure businessId is a string
      setNotifications(notificationList);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setAlert({ message: 'Failed to fetch notifications.', severity: 'error' });
    }
  }, []);

  const contextValue = {
    notifications,
    fetchAllNotifications,
    alert,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
