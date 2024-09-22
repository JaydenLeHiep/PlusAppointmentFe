import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
    fetchOpeningHours, 
    addOpeningHours, 
    updateOpeningHours, 
    deleteOpeningHours 
} from '../lib/apiClientOpeningHours'; 

const OpeningHoursContext = createContext();

export const useOpeningHoursContext = () => useContext(OpeningHoursContext);

export const OpeningHoursProvider = ({ children }) => {
  const [openingHours, setOpeningHours] = useState(null); // Using 'null' as the initial state since it's a single object
  const [alert, setAlert] = useState({ message: '', severity: '' });

  // Fetch opening hours for a business
  const fetchOpeningHoursForBusiness = useCallback(async (businessId) => {
    try {
      const response = await fetchOpeningHours(businessId);
      setOpeningHours(response);
    } catch (error) {
      console.error('Error fetching opening hours for business:', error);
      setAlert({ message: 'Failed to fetch opening hours for business.', severity: 'error' });
    }
  }, []);

  // Add new opening hours
  const addNewOpeningHours = useCallback(async (businessId, openingHoursDetails) => {
    try {
      await addOpeningHours(businessId, openingHoursDetails);
      setAlert({ message: 'Opening hours added successfully!', severity: 'success' });
      await fetchOpeningHoursForBusiness(businessId); // Refresh the opening hours
    } catch (error) {
      console.error('Error adding opening hours:', error);
      setAlert({ message: 'Failed to add opening hours.', severity: 'error' });
      throw error;
    }
  }, [fetchOpeningHoursForBusiness]);

  // Update existing opening hours
  const updateExistingOpeningHours = useCallback(async (businessId, openingHoursDetails) => {
    try {
      await updateOpeningHours(businessId, openingHoursDetails);
      setAlert({ message: 'Opening hours updated successfully!', severity: 'success' });
      await fetchOpeningHoursForBusiness(businessId); // Refresh the opening hours
    } catch (error) {
      console.error('Error updating opening hours:', error);
      setAlert({ message: 'Failed to update opening hours.', severity: 'error' });
      throw error;
    }
  }, [fetchOpeningHoursForBusiness]);

  // Delete opening hours
  const deleteExistingOpeningHours = useCallback(async (businessId) => {
    try {
      await deleteOpeningHours(businessId);
      setAlert({ message: 'Opening hours deleted successfully!', severity: 'success' });
      setOpeningHours(null); // Clear the opening hours after deletion
    } catch (error) {
      console.error('Error deleting opening hours:', error);
      setAlert({ message: 'Failed to delete opening hours.', severity: 'error' });
      throw error;
    }
  }, []);

  const contextValue = {
    openingHours,
    fetchOpeningHoursForBusiness,
    addNewOpeningHours,
    updateExistingOpeningHours,
    deleteExistingOpeningHours,
    alert,
  };

  return (
    <OpeningHoursContext.Provider value={contextValue}>
      {children}
    </OpeningHoursContext.Provider>
  );
};