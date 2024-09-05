import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FullCalendarComponent from '../ownerDashboard/calendar/FullCalendarComponent';
import BusinessInfo from './BusinessInfor';
import ShowStaffDialog from './staff/showStaffDialog.js';
import AddAppointmentDialog from '../ownerDashboard/appointment/AddAppointment/AddAppointmentDialog';
import ShowServicesDialog from './servicecomponent/showServiceDialog';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import ShowCustomerDialog from '../ownerDashboard/customer/ShowCustomerDialog';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness, staff, services, appointments, customers, notAvailableDates }) => {
  const { fetchAppointmentsForBusiness } = useAppointmentsContext();

  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);

  const handleStaffOpen = () => setStaffOpen(true);
  const handleStaffClose = () => setStaffOpen(false);
  const handleAppointmentOpen = () => setAppointmentOpen(true);
  const handleAppointmentClose = async () => {
    setAppointmentOpen(false);
    if (selectedBusiness && selectedBusiness.businessId) {
      await fetchAppointmentsForBusiness(selectedBusiness.businessId);
    }
  };
  const handleServicesOpen = () => setServicesOpen(true);
  const handleServicesClose = () => setServicesOpen(false);
  const handleCustomerOpen = () => setCustomerOpen(true);
  const handleCustomerClose = () => setCustomerOpen(false);

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  if (!selectedBusiness || !selectedBusiness.businessId) {
    return <Typography variant="h6">No business selected or business ID is missing.</Typography>;
  }

  const events = appointments.map(appt => {
    let startTime = new Date(appt.appointmentTime).getTime();

    return appt.services.$values.map(service => {
      const serviceStart = new Date(startTime);
      const serviceEnd = new Date(startTime + parseDuration(service.duration));

      startTime += parseDuration(service.duration);

      return {
        ...appt, // Include all the appointment details
        title: `${appt.customerName} - ${service.name}`,
        start: serviceStart,
        end: serviceEnd,
        serviceName: service.name,
        staffName: service.staffName,
        serviceId: service.serviceId,
        staffId: service.staffId,
      };
    });
  }).flat();

  return (
    <Box>
      <BusinessInfo
        selectedBusiness={{ ...selectedBusiness, services }}
        staff={staff}
        appointments={appointments}
        handleStaffOpen={handleStaffOpen}
        handleServiceOpen={handleServicesOpen}
        handleCustomerOpen={handleCustomerOpen}
        servicesCount={services.length}
        staffCount={staff.length}
        appointmentsCount={appointments.length}
        onBack={() => setSelectedBusiness(null)}
        onAddAppointment={handleAppointmentOpen}
      />

      <Box style={{ marginBottom: '10px' }}>
        <FullCalendarComponent
          events={events}
          staff={staff}
          services= {services}
        />
      </Box>

      <ShowStaffDialog open={staffOpen} onClose={handleStaffClose} businessId={selectedBusiness.businessId} notAvailableDates={notAvailableDates}/>
      <AddAppointmentDialog open={appointmentOpen} onClose={handleAppointmentClose} businessId={selectedBusiness.businessId} setAppointments={fetchAppointmentsForBusiness} />
      <ShowServicesDialog open={servicesOpen} onClose={handleServicesClose} businessId={selectedBusiness.businessId} />
      <ShowCustomerDialog open={customerOpen} onClose={handleCustomerClose} businessId={selectedBusiness.businessId} customers={customers} />
    </Box>
  );
};

export default BusinessDetails;
