import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import FullCalendarComponent from '../calendar/FullCalendarComponent';
import '../../styles/css/OwnerDashboard.css';
import BusinessInfo from './BusinessInfor';
import ShowStaffDialog from '../staff/showStaffDialog';
import AddAppointmentDialog from '../appointment/AddApointmentDialog';
import ShowServicesDialog from '../servicecomponent/showServiceDialog';
import { useStaffsContext } from '../staff/StaffsContext';
import { useServicesContext } from '../servicecomponent/ServicesContext';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness }) => {
  const { staff, fetchAllStaff } = useStaffsContext();
  const { services, fetchServices } = useServicesContext();
  const { appointments, fetchAppointmentsForBusiness } = useAppointmentsContext();

  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const fetchAllData = useCallback(async () => {
    if (selectedBusiness && selectedBusiness.businessId) {
        await fetchAllStaff(selectedBusiness.businessId);
        await fetchServices(selectedBusiness.businessId);
        await fetchAppointmentsForBusiness(selectedBusiness.businessId);
    } else {
        console.warn("No valid business selected or businessId is undefined.");
    }
}, [selectedBusiness, fetchAllStaff, fetchServices, fetchAppointmentsForBusiness]);

useEffect(() => {
  if (selectedBusiness && selectedBusiness.businessId) {
    fetchAllData();
  } else {
    console.warn("No valid business selected or businessId is undefined.");
  }
}, [selectedBusiness, fetchAllData]);

  const handleStaffOpen = () => setStaffOpen(true);

  const handleStaffClose = async () => {
    setStaffOpen(false);
    if (selectedBusiness && selectedBusiness.businessId) {
      await fetchAllStaff(selectedBusiness.businessId);
    }
  };

  const handleAppointmentOpen = () => setAppointmentOpen(true);

  const handleAppointmentClose = async () => {
    setAppointmentOpen(false);
    if (selectedBusiness && selectedBusiness.businessId) {
      await fetchAppointmentsForBusiness(selectedBusiness.businessId);
    }
  };

  const handleServicesOpen = () => setServicesOpen(true);

  const handleServicesClose = async () => {
    setServicesOpen(false);
    if (selectedBusiness && selectedBusiness.businessId) {
      await fetchServices(selectedBusiness.businessId);
    }
  };

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  if (!selectedBusiness || !selectedBusiness.businessId) {
    return <Typography variant="h6">No business selected or business ID is missing.</Typography>;
  }

  return (
    <Box>
      <BusinessInfo
        selectedBusiness={{ ...selectedBusiness, services }}
        staff={staff}
        appointments={appointments}
        handleStaffOpen={handleStaffOpen}
        handleServiceOpen={handleServicesOpen}
        servicesCount={services.length}
        staffCount={staff.length}
        appointmentsCount={appointments.length}
        onBack={() => setSelectedBusiness(null)}
        onAddAppointment={handleAppointmentOpen}
      />

      <Box className="calendar-container" style={{ marginBottom: '10px' }}>
        <FullCalendarComponent
          events={appointments.map(appt => ({
            title: `${appt.customerName}`,
            start: new Date(appt.appointmentTime).toISOString(),
            end: new Date(new Date(appt.appointmentTime).getTime() + parseDuration(appt.duration)).toISOString(),
            customerName: appt.customerName,
            customerPhone: appt.customerPhone,
            appointmentTime: appt.appointmentTime,
            service: appt.serviceName,
            staffName: appt.staffName,
            status: appt.status,
            appointmentId: appt.appointmentId,
          }))}
          staff={staff}
        />
      </Box>

      <ShowStaffDialog open={staffOpen} onClose={handleStaffClose} businessId={selectedBusiness.businessId} />
      <AddAppointmentDialog open={appointmentOpen} onClose={handleAppointmentClose} businessId={selectedBusiness.businessId} setAppointments={fetchAppointmentsForBusiness} />
      <ShowServicesDialog
        open={servicesOpen}
        onClose={handleServicesClose}
        businessId={selectedBusiness.businessId}
      />
    </Box>
  );
};

export default BusinessDetails;
