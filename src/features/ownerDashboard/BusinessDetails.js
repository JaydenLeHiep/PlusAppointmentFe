import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FullCalendarComponent from '../calendar/FullCalendarComponent';
import BusinessInfo from './BusinessInfor';
import ShowStaffDialog from '../staff/showStaffDialog';
import AddAppointmentDialog from '../appointment/AddAppointment/AddAppointmentDialog';
import ShowServicesDialog from '../servicecomponent/showServiceDialog';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import ShowCustomerDialog from '../customer/ShowCustomerDialog'; 

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness, staff, services, appointments }) => {
  const { fetchAppointmentsForBusiness } = useAppointmentsContext();

  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [customerOpen, setCustomerOpen] = useState(false);
  const handleStaffOpen = () => setStaffOpen(true);

  const handleStaffClose = () => {
    setStaffOpen(false);
  };

  const handleAppointmentOpen = () => setAppointmentOpen(true);

  const handleAppointmentClose = async () => {
    setAppointmentOpen(false);
    if (selectedBusiness && selectedBusiness.businessId) {
      await fetchAppointmentsForBusiness(selectedBusiness.businessId);
    }
  };

  const handleServicesOpen = () => setServicesOpen(true);

  const handleServicesClose = () => {
    setServicesOpen(false);
  };
  const handleCustomerOpen = () => setCustomerOpen(true); 
  const handleCustomerClose = () => setCustomerOpen(false); 

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
        handleCustomerOpen={handleCustomerOpen}
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
      <ShowServicesDialog open={servicesOpen} onClose={handleServicesClose} businessId={selectedBusiness.businessId} />
      <ShowCustomerDialog open={customerOpen} onClose={handleCustomerClose} />
    </Box>
  );
};

export default BusinessDetails;
