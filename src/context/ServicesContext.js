import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchServices as apiFetchServices,
  addService as apiAddService,
  updateService as apiUpdateService,
  deleteService as apiDeleteService,
  fetchCategories as apiFetchCategories
} from '../lib/apiClientService';

const ServicesContext = createContext();

export const useServicesContext = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' });  // Alert state

  // Fetch services
  const fetchServices = useCallback(async (businessId) => {
    try {
      const servicesList = await apiFetchServices(String(businessId));
      const mappedServices = servicesList.map(service => ({
        ...service,
        serviceId: service.serviceId
      }));
      setServices(mappedServices);
    } catch (error) {

      setAlert({ message: 'Failed to fetch services.', severity: 'error' });
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesList = await apiFetchCategories();

      setCategories(categoriesList);
    } catch (error) {

      setAlert({ message: 'Failed to fetch categories.', severity: 'error' });
    }
  }, []);

  // Add service
  const addService = useCallback(async (businessId, serviceDetails) => {
    try {
      // Ensure categoryId is included in serviceDetails
      if (!serviceDetails.categoryId) {
        throw new Error('Category ID is required to add a service.');
      }

      await apiAddService(String(businessId), serviceDetails);  // Ensure businessId is a string
      setAlert({ message: 'Service added successfully!', severity: 'success' });
      await fetchServices(businessId); // Refresh the services list
    } catch (error) {
      console.error('Error adding service:', error);
      setAlert({ message: 'Failed to add service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  // Update service
  const updateService = useCallback(async (businessId, serviceId, serviceDetails) => {
    try {
      // Ensure categoryId is included in serviceDetails
      if (!serviceDetails.categoryId) {
        throw new Error('Category ID is required to update a service.');
      }

      await apiUpdateService(String(businessId), serviceId, serviceDetails);  // Ensure businessId is a string
      setAlert({ message: 'Service updated successfully!', severity: 'success' });
      await fetchServices(businessId); // Refresh the services list
    } catch (error) {
      console.error('Error updating service:', error);
      setAlert({ message: 'Failed to update service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  // Delete service
  const deleteService = useCallback(async (businessId, serviceId) => {
    try {
      await apiDeleteService(String(businessId), serviceId);
      setAlert({ message: 'Service deleted successfully!', severity: 'success' });
      await fetchServices(businessId);
    } catch (error) {
      console.error('Error deleting service:', error);
      setAlert({ message: 'Failed to delete service.', severity: 'error' });
      throw error;
    }
  }, [fetchServices]);

  const contextValue = {
    services,
    categories,
    fetchServices,
    fetchCategories,
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