import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {  fetchAppointments } from '../../lib/apiClient';
import {fetchStaff} from '../../lib/apiClientStaff';
import FullCalendarComponent from '../calendar/FullCalendarComponent';
import '../../styles/css/OwnerDashboard.css';
import BusinessInfo from './BusinessInfor';
import ShowStaffDialog from '../showStaffDialog/showStaffDialog';
import AddAppointmentDialog from '../appointment/AddApointmentDialog';

const BusinessDetails = ({ selectedBusiness, setSelectedBusiness, appointments = [], setAppointments }) => {
  const [staff, setStaff] = useState([]);
  const [staffOpen, setStaffOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const fetchStaffData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const staffData = await fetchStaff(selectedBusiness.businessId);
        setStaff(staffData);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    }
  }, [selectedBusiness]);

  const fetchAppointmentData = useCallback(async () => {
    if (selectedBusiness) {
      try {
        const appointmentData = await fetchAppointments(selectedBusiness.businessId);
        setAppointments(appointmentData);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    }
  }, [selectedBusiness, setAppointments]);

  useEffect(() => {
    fetchStaffData();
    fetchAppointmentData();
  }, [selectedBusiness, fetchStaffData, fetchAppointmentData]);

  const handleStaffOpen = () => {
    setStaffOpen(true);
  };

  const handleStaffClose = () => {
    setStaffOpen(false);
  };

  const handleAppointmentOpen = () => {
    setAppointmentOpen(true);
  };

  const handleAppointmentClose = () => {
    setAppointmentOpen(false);
  };

  const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  return (
    <Box>
      <BusinessInfo
        selectedBusiness={selectedBusiness}
        staff={staff}
        appointments={appointments}
        handleStaffOpen={handleStaffOpen}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSelectedBusiness(null)}
        style={{ marginTop: '10px' }}
      >
        Back to list
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleStaffOpen}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Show Staff
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAppointmentOpen}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Add Appointment
      </Button>

      <ShowStaffDialog open={staffOpen} onClose={handleStaffClose} businessId={selectedBusiness.businessId} />
      <AddAppointmentDialog open={appointmentOpen} onClose={handleAppointmentClose} businessId={selectedBusiness.businessId} setAppointments={setAppointments} />
    </Box>
  );
};

export default BusinessDetails;
