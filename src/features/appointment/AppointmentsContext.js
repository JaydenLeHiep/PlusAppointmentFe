import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchAppointments as apiFetchAppointments,
  addAppointment as apiAddAppointment,
  changeStatusAppointments as apiChangeStatusAppointments,
  deleteAppointment as apiDeleteAppointment
} from '../../lib/apiClientAppointment';

const AppointmentsContext = createContext();

export const useAppointmentsContext = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentsForBusiness = useCallback(async (businessId) => {
    try {
      const appointmentList = await apiFetchAppointments(businessId);
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
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

  const contextValue = {
    appointments,
    fetchAppointmentsForBusiness,
    addAppointmentAndUpdateList,
    changeStatusAppointments,
    deleteAppointmentAndUpdateList
  };

  return (
    <AppointmentsContext.Provider value={contextValue}>
      {children}
    </AppointmentsContext.Provider>
  );
};
