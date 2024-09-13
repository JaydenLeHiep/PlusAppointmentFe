import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchNotAvailableTimes as apiFetchNotAvailableTimes,
  fetchNotAvailableTimesByBusiness as apiFetchNotAvailableTimesByBusiness,
  addNotAvailableTime as apiAddNotAvailableTime,
  updateNotAvailableTime as apiUpdateNotAvailableTime,
  deleteNotAvailableTime as apiDeleteNotAvailableTime,
} from '../lib/apiClientNotAvailableTime';

const NotAvailableTimeContext = createContext();

export const useNotAvailableTimeContext = () => useContext(NotAvailableTimeContext);

export const NotAvailableTimeProvider = ({ children }) => {
  const [notAvailableTimes, setNotAvailableTimes] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchAllNotAvailableTimesByStaff = useCallback(async (businessId, staffId) => {
    try {
      const timesList = await apiFetchNotAvailableTimes(String(businessId), staffId);
      setNotAvailableTimes(timesList.$values || timesList); 
    } catch (error) {
      console.error('Error fetching not available times:', error);
      setAlert({ message: 'Failed to fetch not available times.', severity: 'error' });
    }
  }, []);

  const fetchAllNotAvailableTimesByBusiness = useCallback(async (businessId) => {
    try {
      const timesList = await apiFetchNotAvailableTimesByBusiness(String(businessId));
      setNotAvailableTimes(timesList.$values || timesList);
    } catch (error) {
      console.error('Error fetching not available times for business:', error);
      setAlert({ message: 'Failed to fetch not available times for the business.', severity: 'error' });
    }
  }, []);

  const addNotAvailableTime = useCallback(async (businessId, staffId, notAvailableTimeDetails) => {
    try {
      await apiAddNotAvailableTime(String(businessId), staffId, notAvailableTimeDetails);
      setAlert({ message: 'Not available time added successfully!', severity: 'success' });
      await fetchAllNotAvailableTimesByBusiness(businessId); 
    } catch (error) {
      console.error('Error adding not available time:', error);
      setAlert({ message: 'Failed to add not available time.', severity: 'error' });
      throw error;
    }
  }, [fetchAllNotAvailableTimesByBusiness]);

  const updateNotAvailableTime = useCallback(async (businessId, staffId, notAvailableTimeId, notAvailableTimeDetails) => {
    try {
      await apiUpdateNotAvailableTime(String(businessId), staffId, notAvailableTimeId, notAvailableTimeDetails);
      setAlert({ message: 'Not available time updated successfully!', severity: 'success' });
      await fetchAllNotAvailableTimesByBusiness(businessId);
    } catch (error) {
      console.error('Error updating not available time:', error);
      setAlert({ message: 'Failed to update not available time.', severity: 'error' });
      throw error;
    }
  }, [fetchAllNotAvailableTimesByBusiness]);

  const deleteNotAvailableTime = useCallback(async (businessId, staffId, notAvailableTimeId) => {
    try {
      await apiDeleteNotAvailableTime(String(businessId), staffId, notAvailableTimeId);
      setAlert({ message: 'Not available time deleted successfully!', severity: 'success' });
      await fetchAllNotAvailableTimesByBusiness(businessId); 
    } catch (error) {
      console.error('Error deleting not available time:', error);
      setAlert({ message: 'Failed to delete not available time.', severity: 'error' });
      throw error;
    }
  }, [fetchAllNotAvailableTimesByBusiness]);

  const contextValue = {
    notAvailableTimes,
    fetchAllNotAvailableTimesByStaff,
    fetchAllNotAvailableTimesByBusiness,
    addNotAvailableTime,
    updateNotAvailableTime,
    deleteNotAvailableTime,
    alert,
  };

  return (
    <NotAvailableTimeContext.Provider value={contextValue}>
      {children}
    </NotAvailableTimeContext.Provider>
  );
};
