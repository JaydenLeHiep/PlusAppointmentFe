import React from 'react';
import { Box, Typography, List, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  OverviewContainer,
  OverviewItem,
  OverviewText,
  OverviewButton,
  StyledListItemText,
  ServiceNameText,
  TotalPriceTypography
} from '../../styles/CustomerStyle/AppointmentOverViewPageStyle';
import { useTranslation } from 'react-i18next';

const AppointmentOverviewPage = ({ selectedAppointments, onAddMoreServices, onFinish, onDeleteAppointment }) => {
  const { t } = useTranslation('appointmentOverviewPage');

  const handleFinish = () => {
    onFinish(selectedAppointments);
  };

  // Calculate total price of all selected services
  const totalPrice = selectedAppointments.reduce((total, appointment) => {
    const appointmentTotal = appointment.services.reduce((sum, service) => sum + (service.price || 0), 0);
    return total + appointmentTotal;
  }, 0);

  return (
    <OverviewContainer>
      <Typography
        variant="h5"
        sx={{
          fontSize: '35px',
          marginBottom: 3,
          fontWeight: 'bold',
          color: 'Black',
          textAlign: 'center'
        }}
      >
        {t('appointmentOverviewTitle')}
      </Typography>
      {selectedAppointments.map((appointment, index) => (
        <OverviewItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <ServiceNameText>{t('serviceLabel')}: {appointment.serviceName}</ServiceNameText>
            <OverviewText>{t('staffLabel')}: {appointment.staffName}</OverviewText>
            <Typography variant="body2">
              {t('dateLabel')}: {new Date(appointment.appointmentTime).toLocaleDateString('en-GB')} | {t('timeLabel')}: {new Date(appointment.appointmentTime).toLocaleTimeString()}
            </Typography>
            <List dense>
              {appointment.services.map((service, idx) => (
                <StyledListItemText
                  key={idx}
                  primary={service.serviceName}
                  secondary={`${t('durationLabel')}: ${service.duration || 'N/A'} | ${t('priceLabel')}: €${service.price || 'N/A'}`}
                />
              ))}
            </List>
          </Box>
          <IconButton
            onClick={() => onDeleteAppointment(index)}
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </OverviewItem>
      ))}

      {/* Display total price */}
      <TotalPriceTypography variant="h6">
        {t('TotalPriceLabel')}: €{totalPrice.toFixed(2)}
      </TotalPriceTypography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <OverviewButton
          variant="contained"
          onClick={onAddMoreServices}
          sx={{ marginRight: 2 }}
        >
          {t('addMoreServicesButton')}
        </OverviewButton>
        <OverviewButton
          variant="contained"
          onClick={handleFinish}
        >
          {t('finishButton')}
        </OverviewButton>
      </Box>
    </OverviewContainer>
  );
};

export default AppointmentOverviewPage;