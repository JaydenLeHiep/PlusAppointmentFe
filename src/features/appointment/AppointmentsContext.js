// AppointmentsContext.js
import React, { createContext, useContext, useState } from 'react';
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

  // Fetch appointments for a specific business
  const fetchAppointmentsForBusiness = async (businessId) => {
    try {
      const appointmentList = await apiFetchAppointments(businessId);
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Add a new appointment and update the list
  const addAppointmentAndUpdateList = async (appointmentData) => {
    try {
      await apiAddAppointment(appointmentData);
      await fetchAppointmentsForBusiness(appointmentData.businessId);
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  };

  // Change status of an existing appointment
  const changeStatusAppointments = async (appointmentId, status) => {
    try {
      await apiChangeStatusAppointments(appointmentId, status);
      // Optionally fetch appointments again after status change
      // await fetchAppointmentsForBusiness(appointmentData.businessId);
    } catch (error) {
      console.error('Error changing appointment status:', error);
      throw error;
    }
  };

  // Delete an appointment and update the list
  const deleteAppointmentAndUpdateList = async (appointmentId) => {
    try {
      await apiDeleteAppointment(appointmentId);
      await fetchAppointmentsForBusiness(); // Optionally fetch appointments after deletion
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  };

  // Context provider value
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
