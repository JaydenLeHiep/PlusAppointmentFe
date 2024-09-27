import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchAppointments as apiFetchAppointments,
  addAppointment as apiAddAppointment,
  changeStatusAppointments as apiChangeStatusAppointments,
  deleteAppointment as apiDeleteAppointment,
  fetchAppointmentById as apiFetchAppointmentById,
  updateAppointment as apiUpdateAppointment,
  fetchAppointmentsByCustomerId,
  deleteAppointmentForCustomer as apiDeleteAppointmentForCustomer
} from '../lib/apiClientAppointment';
import { fetchCustomers as apiFetchAllCustomers } from '../lib/apiClientCustomer';
import { useServicesContext } from '../context/ServicesContext';
import { useStaffsContext } from '../context/StaffsContext';

const AppointmentsContext = createContext();

export const useAppointmentsContext = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Use the services and staff contexts
  const { services, fetchServices, fetchServiceById } = useServicesContext();
  const { staff, fetchAllStaff } = useStaffsContext();

  const fetchAppointmentsForBusiness = useCallback(async (businessId) => {
    if (!businessId) {
      console.error('No business ID provided');
      return;
    }
    try {
      const appointmentList = await apiFetchAppointments(businessId);
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, []);

  const fetchAppointmentById = useCallback(async (appointmentId) => {
    try {
      return await apiFetchAppointmentById(appointmentId);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  }, []);

  const addAppointmentAndUpdateList = useCallback(async (appointmentData) => {
    try {
      await apiAddAppointment(appointmentData);
      await fetchAppointmentsForBusiness(appointmentData.businessId);
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  }, [fetchAppointmentsForBusiness]);

  const changeStatusAppointments = useCallback(async (appointmentId, status, businessId) => {
    try {
      await apiChangeStatusAppointments(appointmentId, status);
      // await fetchAppointmentsForBusiness(businessId);
    } catch (error) {
      console.error('Error changing appointment status:', error);
      throw error;
    }
  }, []);

  const deleteAppointmentAndUpdateList = useCallback(async (appointmentId, businessId) => {
    try {
      await apiDeleteAppointment(appointmentId);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }, []);

  const deleteAppointmentForCustomer = useCallback(async (appointmentId, businessId) => {
    try {
      await apiDeleteAppointmentForCustomer(appointmentId);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }, []);

  const updateAppointmentAndRefresh = useCallback(async (appointmentId, updateData, businessId) => {
    try {
      await apiUpdateAppointment(appointmentId, updateData);
      await fetchAppointmentsForBusiness(businessId);
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }, [fetchAppointmentsForBusiness]);

  const fetchAllCustomers = useCallback(async (businessId) => {
    try {
      const customersList = await apiFetchAllCustomers(businessId);
      setCustomers(customersList);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  const getAppointmentById = (appointmentId) => {
    return appointments.find(appt => appt.appointmentId === appointmentId);
  };

  const fetchAppointmentsForCustomer = useCallback(async (customerId) => {
    try {
      const appointments = await fetchAppointmentsByCustomerId(customerId);
      return appointments;
    } catch (error) {
      console.error('Error fetching appointments for customer:', error);
      throw error;
    }
  }, []);

  const contextValue = {
    appointments,
    setAppointments,
    services,
    customers,
    staff,
    fetchAppointmentsForBusiness,
    fetchAppointmentById,
    addAppointmentAndUpdateList,
    changeStatusAppointments,
    deleteAppointmentAndUpdateList,
    updateAppointmentAndRefresh,
    fetchServices,
    fetchAllCustomers,
    fetchAllStaff,
    fetchServiceById,
    getAppointmentById,
    fetchAppointmentsForCustomer,
    deleteAppointmentForCustomer
  };

  return (
    <AppointmentsContext.Provider value={contextValue}>
      {children}
    </AppointmentsContext.Provider>
  );
};
