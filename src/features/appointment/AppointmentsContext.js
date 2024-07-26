import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchAppointments as apiFetchAppointments,
  addAppointment as apiAddAppointment,
  changeStatusAppointments as apiChangeStatusAppointments,
  deleteAppointment as apiDeleteAppointment,
  fetchAppointmentById as apiFetchAppointmentById,
  updateAppointment as apiUpdateAppointment,
} from '../../lib/apiClientAppointment';
import { fetchService as apiFetchServices, fetchServiceById as apiFetchServiceById }  from '../../lib/apiClientServices';
import { fetchCustomers as apiFetchAllCustomers } from '../../lib/apiClientCustomer';
import { fetchStaff as apiFetchAllStaff } from '../../lib/apiClientStaff';
const AppointmentsContext = createContext();

export const useAppointmentsContext = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);

  const fetchAppointmentsForBusiness = useCallback(async (businessId) => {
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
      await fetchAppointmentsForBusiness(businessId);
    } catch (error) {
      console.error('Error changing appointment status:', error);
      throw error;
    }
  }, [fetchAppointmentsForBusiness]);

  const deleteAppointmentAndUpdateList = useCallback(async (appointmentId, businessId) => {
    try {
      await apiDeleteAppointment(appointmentId);
      await fetchAppointmentsForBusiness(businessId);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }, [fetchAppointmentsForBusiness]);

  const fetchServices = useCallback(async (businessId) => {
    try {
      const servicesList = await apiFetchServices(businessId);
      setServices(servicesList);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }, []);

  const fetchAllCustomers = useCallback(async (businessId) => {
    try {
      const customersList = await apiFetchAllCustomers(businessId);
      setCustomers(customersList);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  }, []);

  const fetchAllStaff = useCallback(async (businessId) => {
    try {
      const staffList = await apiFetchAllStaff(businessId);
      setStaff(staffList);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  }, []);

  const fetchServiceById = useCallback(async (serviceId) => {
    try {
      return await apiFetchServiceById(serviceId);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  }, []);

  const contextValue = {
    appointments,
    services,
    customers,
    staff,
    fetchAppointmentsForBusiness,
    fetchAppointmentById,
    addAppointmentAndUpdateList,
    changeStatusAppointments,
    deleteAppointmentAndUpdateList,
    fetchServices,
    fetchAllCustomers,
    fetchAllStaff,
    fetchServiceById,
  };

  return (
    <AppointmentsContext.Provider value={contextValue}>
      {children}
    </AppointmentsContext.Provider>
  );
};