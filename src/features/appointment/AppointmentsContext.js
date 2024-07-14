// AppointmentsContext.js
import React, { createContext, useContext, useState } from 'react';
import { fetchAppointments, addAppointment } from '../../lib/apiClientAppointment';

const AppointmentsContext = createContext();

export const useAppointmentsContext = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentsForBusiness = async (businessId) => {
    try {
        console.log(businessId)
      const appointmentList = await fetchAppointments(businessId);
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const addAppointmentAndUpdateList = async (appointmentData) => {
    try {
      await addAppointment(appointmentData);
      await fetchAppointmentsForBusiness(appointmentData.businessId); // Update appointments after adding
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error; // Propagate error to handle in components
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, fetchAppointmentsForBusiness, addAppointmentAndUpdateList }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
