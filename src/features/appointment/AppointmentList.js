import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, MenuItem, Select, FormControl, InputLabel, ButtonBase, Box, Badge } from '@mui/material';
import AppointmentInfoModal from '../appointment/AppointmentInfoModal/AppointmentInfoModal.js';
import { useTranslation } from 'react-i18next';

const AppointmentList = ({ appointments, businessId, onAppointmentChange }) => {
  const { t } = useTranslation('appointmentList'); // Use the 'appointmentList' namespace for translations
  const [sortCriteria, setSortCriteria] = useState('date');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (selectedAppointmentId !== null) {
      setModalOpen(true);
    }
  }, [selectedAppointmentId]);

  const handleAppointmentClick = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointmentId(null);
  };

  const handleAddOrUpdateAppointment = () => {
    // After adding or updating an appointment, call the callback to refresh the list
    onAppointmentChange();
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
        appointmentId={selectedAppointmentId} 
        onClose={handleCloseModal}
        onAppointmentChange={handleAddOrUpdateAppointment} // Pass the callback to the modal if needed
      />
      <List>
        {sortedAppointments.map((appointment) => {
          const appointmentTime = new Date(appointment.appointmentTime);
          const hours = String(appointmentTime.getUTCHours()).padStart(2, '0');
          const minutes = String(appointmentTime.getUTCMinutes()).padStart(2, '0');
          const day = String(appointmentTime.getUTCDate()).padStart(2, '0');
          const month = String(appointmentTime.getUTCMonth() + 1).padStart(2, '0');

          return (
            <ListItem key={appointment.appointmentId} sx={{ p: 0 }}>
              <ButtonBase onClick={() => handleAppointmentClick(appointment.appointmentId)} sx={{ width: '100%' }}>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    width: '100%', 
                    padding: '16px', 
                    marginBottom: '8px', 
                    borderRadius: '12px', 
                    backgroundColor: '#f0f8ff', 
                    border: '1px solid #1976d2', 
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      backgroundColor: '#e6f1ff', 
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '120px', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {`${hours}:${minutes}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {`${day}/${month}`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {appointment.customerName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {appointment.customerPhone}
                        </Typography>
                      </Box>
                    </Box>
                    <Badge
                      badgeContent={t(appointment.status.toLowerCase())}
                      color={appointment.status.toLowerCase() === 'confirmed' ? 'success' : appointment.status.toLowerCase() === 'pending' ? 'warning' : 'error'}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          padding: '0 8px',
                          borderRadius: '8px',
                          height: '24px',
                          lineHeight: '24px',
                          minWidth: '60px',
                          textAlign: 'center',
                          backgroundColor: appointment.status.toLowerCase() === 'confirmed' ? '#4caf50' : appointment.status.toLowerCase() === 'pending' ? '#ff9800' : '#f44336',
                          color: '#fff'
                        }
                      }}
                    />
                  </Box>
                </Paper>
              </ButtonBase>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default AppointmentList;
