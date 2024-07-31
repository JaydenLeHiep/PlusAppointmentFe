import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchStaff as apiFetchStaff, addStaff as apiAddStaff, updateStaff as apiUpdateStaff, deleteStaff as apiDeleteStaff } from '../../lib/apiClientStaff';

const StaffsContext = createContext();

export const useStaffsContext = () => useContext(StaffsContext);

export const StaffsProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  const fetchAllStaff = useCallback(async (businessId) => {
    try {
      const staffList = await apiFetchStaff(String(businessId)); // Ensure businessId is a string
      setStaff(staffList);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setAlert({ message: 'Failed to fetch staff.', severity: 'error' });
    }
  }, []);

  const addStaff = useCallback(async (businessId, staffDetails) => {
    try {
      await apiAddStaff(String(businessId), staffDetails); // Ensure businessId is a string
      setAlert({ message: 'Staff added successfully!', severity: 'success' });
      await fetchAllStaff(businessId); // Refresh the staff list
    } catch (error) {
      console.error('Error adding staff:', error);
      setAlert({ message: 'Failed to add staff.', severity: 'error' });
      throw error;
    }
  }, [fetchAllStaff]);

  const updateStaff = useCallback(async (businessId, staffId, staffDetails) => {
    try {
      await apiUpdateStaff(String(businessId), staffId, staffDetails); // Ensure businessId is a string
      setAlert({ message: 'Staff updated successfully!', severity: 'success' });
      await fetchAllStaff(businessId); // Refresh the staff list
    } catch (error) {
      console.error('Error updating staff:', error);
      setAlert({ message: 'Failed to update staff.', severity: 'error' });
      throw error;
    }
  }, [fetchAllStaff]);

  const deleteStaff = useCallback(async (businessId, staffId) => {
    try {
      await apiDeleteStaff(String(businessId), staffId); // Ensure businessId is a string
      setAlert({ message: 'Staff deleted successfully!', severity: 'success' });
      await fetchAllStaff(businessId); // Refresh the staff list
    } catch (error) {
      console.error('Error deleting staff:', error);
      setAlert({ message: 'Failed to delete staff.', severity: 'error' });
      throw error;
    }
  }, [fetchAllStaff]);

  const contextValue = {
    staff,
    fetchAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    alert,
  };

  return (
    <StaffsContext.Provider value={contextValue}>
      {children}
    </StaffsContext.Provider>
  );
};
