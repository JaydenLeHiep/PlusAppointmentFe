import React, { useState, useEffect } from 'react';
import { ListItem, Typography, MenuItem, Select, FormControl, InputLabel, Badge } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal.js';
import { useTranslation } from 'react-i18next';

import { AppointmentPaper, AppointmentButtonBase, AppointmentBox, AppointmentInfoBox, TimeInfo, TimeText, CustomerInfo, BadgeContent, ScrollableAppointmentList }
  from '../../../styles/OwnerStyle/AppointmentListStyles';




const AppointmentList = ({ appointments, staff, services}) => {
  const { t } = useTranslation('appointmentList');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [needToFetch, setNeedToFetch] = useState(false); // New state to track if fetching is required

  useEffect(() => {
    if (modalOpen && needToFetch && selectedAppointment) {
      // fetchAppointmentById(selectedAppointment.appointmentId).then((updatedAppointment) => {
      //   setSelectedAppointment(updatedAppointment);
      //   setNeedToFetch(false); // Reset the fetch requirement after fetching
      // });
    }
  }, [modalOpen, needToFetch, selectedAppointment]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleAfterUpdate = () => {
    setNeedToFetch(true); // Mark that we need to fetch the data again after an update
  };

  const sortedAppointments = appointments?.filter(appt => appt.status !== 'Delete') || [];

  if (sortCriteria === 'date') {
    sortedAppointments.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
  } else if (sortCriteria === 'status') {
    sortedAppointments.sort((a, b) => a.status.localeCompare(b.status));
  }

  if (!appointments || appointments.length === 0) {
    return <Typography variant="h6">{t('noAppointments')}</Typography>;
  }

  return (
    <div>
      <FormControl variant="outlined" style={{ marginBottom: '16px', minWidth: '200px' }}>
        <InputLabel>{t('sortBy')}</InputLabel>
        <Select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          label={t('sortBy')}
        >
          <MenuItem value="date">{t('date')}</MenuItem>
          <MenuItem value="status">{t('status')}</MenuItem>
        </Select>
      </FormControl>
      <AppointmentInfoModal
        open={modalOpen}
        appointment={selectedAppointment}
        onClose={handleCloseModal}
        staff={staff}
        services={services}
        afterUpdate={handleAfterUpdate} // Callback to trigger fetching after an update
      />
      <ScrollableAppointmentList>
        {sortedAppointments.map((appointment) => {
          // Parse the appointment start time
          const appointmentTime = new Date(appointment.appointmentTime);
          const hours = String(appointmentTime.getHours()).padStart(2, '0');
          const minutes = String(appointmentTime.getMinutes()).padStart(2, '0');
          const day = String(appointmentTime.getDate()).padStart(2, '0');
          const month = String(appointmentTime.getMonth() + 1).padStart(2, '0');

          // Function to parse the duration in HH:MM:SS format into milliseconds
          const parseDuration = (duration) => {
            const [hours, minutes, seconds] = duration.split(':').map(Number);
            return (hours * 60 * 60 + minutes * 60 + (seconds || 0)) * 1000;
          };

          // Calculate total duration by summing all service durations
          const totalDurationInMs = appointment.services.$values.reduce((total, service) => {
            return total + parseDuration(service.duration);
          }, 0);

          // Calculate the appointment end time
          const appointmentEndTime = new Date(appointmentTime.getTime() + totalDurationInMs);
          const endHours = String(appointmentEndTime.getHours()).padStart(2, '0');
          const endMinutes = String(appointmentEndTime.getMinutes()).padStart(2, '0');

          return (
            <ListItem key={appointment.appointmentId} sx={{ p: 0 }}>
              <AppointmentButtonBase onClick={() => handleAppointmentClick(appointment)}>
                <AppointmentPaper elevation={3}>
                  <AppointmentBox>
                    <AppointmentInfoBox>
                      <TimeInfo>
                        <TimeText >
                          {`${hours}:${minutes}`} - {`${endHours}:${endMinutes}`} {/* Display start and end time */}
                        </TimeText>
                        <Typography variant="body2" color="textSecondary">
                          {`${day}/${month}`}
                        </Typography>
                      </TimeInfo>
                      <CustomerInfo>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {appointment.customerName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appointment.customerPhone}
                        </Typography>
                      </CustomerInfo>
                    </AppointmentInfoBox>
                    <Badge
                      badgeContent={t(appointment.status.toLowerCase())}
                      color={appointment.status.toLowerCase() === 'confirmed' ? 'success' : appointment.status.toLowerCase() === 'pending' ? 'warning' : 'error'}
                      sx={BadgeContent(appointment.status.toLowerCase())}
                    />
                  </AppointmentBox>
                </AppointmentPaper>
              </AppointmentButtonBase>
            </ListItem>
          );
        })}
        </ScrollableAppointmentList>
    </div>
  );
};

export default AppointmentList;