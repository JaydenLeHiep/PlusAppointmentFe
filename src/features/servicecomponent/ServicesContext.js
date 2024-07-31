import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchServices as apiFetchServices, addService as apiAddService, updateService as apiUpdateService, deleteService as apiDeleteService } from '../../lib/apiClientServicesOwnerDashboard';

const ServicesContext = createContext();

export const useServicesContext = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });  // Alert state

  const fetchServices = useCallback(async (businessId) => {
    try {
      const servicesList = await apiFetchServices(String(businessId));  // Ensure businessId is a string
      setServices(servicesList);
    } catch (error) {
      console.error('Error fetching services:', error);
      setAlert({ message: 'Failed to fetch services.', severity: 'error' });
    }
  }, []);

  const addService = useCallback(async (businessId, serviceDetails) => {
    try {
      await apiAddService(String(businessId), serviceDetails);  // Ensure businessId is a string
      setAlert({ message: 'Service added successfully!', severity: 'success' });
      await fetchServices(businessId); // Refresh the services list
    } catch (error) {
      console.error('Error adding service:', error);
      setAlert({ message: 'Failed to add service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  const updateService = useCallback(async (businessId, serviceId, serviceDetails) => {
    try {
      await apiUpdateService(String(businessId), serviceId, serviceDetails);  // Ensure businessId is a string
      setAlert({ message: 'Service updated successfully!', severity: 'success' });
      await fetchServices(businessId); // Refresh the services list
    } catch (error) {
      console.error('Error updating service:', error);
      setAlert({ message: 'Failed to update service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  const deleteService = useCallback(async (businessId, serviceId) => {
    try {
      await apiDeleteService(String(businessId), serviceId);  // Ensure businessId is a string
      setAlert({ message: 'Service deleted successfully!', severity: 'success' });
      await fetchServices(businessId); // Refresh the services list
    } catch (error) {
      console.error('Error deleting service:', error);
      setAlert({ message: 'Failed to delete service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  const contextValue = {
    services,
    fetchServices,
    addService,
    updateService,
    deleteService,
    alert,
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
};
