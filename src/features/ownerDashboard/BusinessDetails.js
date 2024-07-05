import React, { useState, useEffect, useCallback } from 'react';
import { Box} from '@mui/material';
import { fetchAppointments } from '../../lib/apiClientAppointment';
import { fetchStaff } from '../../lib/apiClientStaff';
import { fetchServices } from '../../lib/apiClientServicesOwnerDashboard';
import FullCalendarComponent from '../calendar/FullCalendarComponent';
import '../../styles/css/OwnerDashboard.css';
import BusinessInfo from './BusinessInfor';
import ShowStaffDialog from '../showStaffDialog/showStaffDialog';
import AddAppointmentDialog from '../appointment/AddApointmentDialog';
import ShowServicesDialog from '../servicecomponent/showServiceDialog';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness, appointments = [], setAppointments }) => {
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [servicesCount, setServicesCount] = useState(0); // New state for services count
  const [staffCount, setStaffCount] = useState(0); // New state for staff count
  const [appointmentsCount, setAppointmentsCount] = useState(0); // New state for appointments count
  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const fetchStaffData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const staffData = await fetchStaff(selectedBusiness.businessId);
        setStaff(staffData);
        setStaffCount(staffData.length); // Update staff count
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    }
  }, [selectedBusiness]);

  const fetchServiceData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const serviceData = await fetchServices(selectedBusiness.businessId);
        setServices(serviceData);
        setServicesCount(serviceData.length); // Update services count
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    }
  }, [selectedBusiness]);

  const fetchAppointmentData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const appointmentData = await fetchAppointments(selectedBusiness.businessId);
        setAppointments(appointmentData);
        setAppointmentsCount(appointmentData.length); // Update appointments count
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    }
  }, [selectedBusiness, setAppointments]);

  useEffect(() => {
    fetchStaffData();
    fetchServiceData();
    fetchAppointmentData();
  }, [selectedBusiness, fetchStaffData, fetchServiceData, fetchAppointmentData]);

  const handleStaffOpen = () => {
    setStaffOpen(true);
  };

  const handleStaffClose = () => {
    setStaffOpen(false);
    fetchStaffData(); // Fetch updated staff data
  };

  const handleAppointmentOpen = () => {
    setAppointmentOpen(true);
  };

  const handleAppointmentClose = () => {
    setAppointmentOpen(false);
    fetchAppointmentData(); // Fetch updated appointment data
  };

  const handleServicesOpen = () => {
    setServicesOpen(true);
  };

  const handleServicesClose = () => {
    setServicesOpen(false);
    fetchServiceData(); // Fetch updated service data
  };

  const handleServiceChange = (newServices) => {
    setServices(newServices);
    setServicesCount(newServices.length); // Update services count
  };

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  return (
    <Box>
      <BusinessInfo
        selectedBusiness={{ ...selectedBusiness, services }}
        staff={staff}
        appointments={appointments}
        handleStaffOpen={handleStaffOpen}
        handleServiceOpen={handleServicesOpen} // Pass handleServiceOpen to BusinessInfo
        servicesCount={servicesCount} // Pass servicesCount to BusinessInfo
        staffCount={staffCount} // Pass staffCount to BusinessInfo
        appointmentsCount={appointmentsCount} // Pass appointmentsCount to BusinessInfo
        onBack={() => setSelectedBusiness(null)} // Pass onBack handler to BusinessInfo
        onAddAppointment={handleAppointmentOpen} // Pass onAddAppointment handler to BusinessInfo
      />
      <Box className="calendar-container" style={{ marginBottom: '10px' }}>
        <FullCalendarComponent events={appointments.map(appt => ({
          title: `${appt.customerName}`,
          start: new Date(appt.appointmentTime).toISOString(),  // Ensure the correct date format
          end: new Date(new Date(appt.appointmentTime).getTime() + parseDuration(appt.duration)).toISOString(),
          extendedProps: {
            service: appt.serviceName,
            staff: appt.staffName,
            status: appt.status
          }
        }))} />
      </Box>

      <ShowStaffDialog open={staffOpen} onClose={handleStaffClose} businessId={selectedBusiness.businessId} />
      <AddAppointmentDialog open={appointmentOpen} onClose={handleAppointmentClose} businessId={selectedBusiness.businessId} setAppointments={setAppointments} />
      <ShowServicesDialog 
        open={servicesOpen} 
        onClose={handleServicesClose} 
        businessId={selectedBusiness.businessId} 
        onServiceChange={handleServiceChange} // Pass handleServiceChange to ShowServicesDialog
      />
    </Box>
  );
};

export default BusinessDetails;