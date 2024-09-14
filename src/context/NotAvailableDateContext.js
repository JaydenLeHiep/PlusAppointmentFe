import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchNotAvailableDates as apiFetchNotAvailableDates,
  fetchNotAvailableDatesByBusiness as apiFetchNotAvailableDatesByBusiness,
  addNotAvailableDate as apiAddNotAvailableDate,
  updateNotAvailableDate as apiUpdateNotAvailableDate,
  deleteNotAvailableDate as apiDeleteNotAvailableDate,
} from '../lib/apiClientNotAvailableDate';

const NotAvailableDateContext = createContext();

export const useNotAvailableDateContext = () => useContext(NotAvailableDateContext);

export const NotAvailableDateProvider = ({ children }) => {
  const [notAvailableDates, setNotAvailableDates] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchAllNotAvailableDatesByStaff = useCallback(async (businessId, staffId) => {
    try {
      const datesList = await apiFetchNotAvailableDates(String(businessId), staffId);
      setNotAvailableDates(datesList.$values || datesList); // Adjust according to your API structure
    } catch (error) {
      console.error('Error fetching not available dates:', error);
      setAlert({ message: 'Failed to fetch not available dates.', severity: 'error' });
    }
  }, []);

  const fetchAllNotAvailableDatesByBusiness = useCallback(async (businessId) => {
    try {
      const datesList = await apiFetchNotAvailableDatesByBusiness(String(businessId));
      setNotAvailableDates(datesList.$values || datesList); // Adjust according to your API structure
    } catch (error) {
      console.error('Error fetching not available dates for business:', error);
      setAlert({ message: 'Failed to fetch not available dates for the business.', severity: 'error' });
    }
  }, []);

  const addNotAvailableDate = useCallback(async (businessId, staffId, notAvailableDateDetails) => {
    try {
      await apiAddNotAvailableDate(String(businessId), staffId, notAvailableDateDetails);
      setAlert({ message: 'Not available date added successfully!', severity: 'success' });
      await fetchAllNotAvailableDatesByBusiness(businessId); // Refresh the not available dates list
    } catch (error) {
      console.error('Error adding not available date:', error);
      setAlert({ message: 'Failed to add not available date.', severity: 'error' });
      throw error;
    }
  }, [ fetchAllNotAvailableDatesByBusiness]);

  const updateNotAvailableDate = useCallback(async (businessId, staffId, notAvailableDateId, notAvailableDateDetails) => {
    try {
      await apiUpdateNotAvailableDate(String(businessId), staffId, notAvailableDateId, notAvailableDateDetails);
      setAlert({ message: 'Not available date updated successfully!', severity: 'success' });
      await  fetchAllNotAvailableDatesByBusiness(businessId); 
    } catch (error) {
      console.error('Error updating not available date:', error);
      setAlert({ message: 'Failed to update not available date.', severity: 'error' });
      throw error;
    }
  }, [ fetchAllNotAvailableDatesByBusiness]);

  const deleteNotAvailableDate = useCallback(async (businessId, staffId, notAvailableDateId) => {
    try {
      await apiDeleteNotAvailableDate(String(businessId), staffId, notAvailableDateId);
      setAlert({ message: 'Not available date deleted successfully!', severity: 'success' });
      await fetchAllNotAvailableDatesByBusiness(businessId); 
    } catch (error) {
      console.error('Error deleting not available date:', error);
      setAlert({ message: 'Failed to delete not available date.', severity: 'error' });
      throw error;
    }
  }, [fetchAllNotAvailableDatesByBusiness]);

  const contextValue = {
    notAvailableDates,
    fetchAllNotAvailableDatesByStaff,
    fetchAllNotAvailableDatesByBusiness,
    addNotAvailableDate,
    updateNotAvailableDate,
    deleteNotAvailableDate,
    alert,
  };

  return (
    <NotAvailableDateContext.Provider value={contextValue}>
      {children}
    </NotAvailableDateContext.Provider>
  );
};