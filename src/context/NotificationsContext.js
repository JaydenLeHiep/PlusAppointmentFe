import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchNotification as apiFetchNotification, markNotificationsAsSeen as apiMarkNotificationsAsSeen } from '../lib/apiClientNotification';

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
  // Mark notifications as seen
  const markNotificationsAsSeen = useCallback(async (businessId, notificationIds) => {
    try {
      await apiMarkNotificationsAsSeen(businessId, notificationIds);
      // Update the local state to mark the notifications as seen
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notificationIds.includes(notification.notificationId) 
            ? { ...notification, isSeen: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
      setAlert({ message: 'Failed to mark notifications as seen.', severity: 'error' });
    }
  }, []);

  const contextValue = {
    notifications,
    fetchAllNotifications,
    markNotificationsAsSeen,
    alert,
  };
  

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
