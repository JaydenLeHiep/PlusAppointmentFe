import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, CircularProgress, Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useServicesContext } from '../../servicecomponent/ServicesContext';

// Styled components using MUI's styled function
const ServiceListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  textAlign: 'left',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '180px',
  boxSizing: 'border-box',
  border: '1px solid #e0e0e0',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const ServiceItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});

const ServiceItemInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

const ServiceItemBoldText = styled(Typography)({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.2rem',
});

const ServiceItemDetails = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  color: '#555',
  fontSize: '1.1rem',
  lineHeight: 1.2,
}));

const ServiceList = ({ businessId, onServiceSelect, searchQuery }) => {
  const { services, fetchServices, loading, error } = useServicesContext();

  useEffect(() => {
    if (businessId && services.length === 0) {
      fetchServices(businessId);
    }
  }, [businessId, fetchServices, services.length]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
      {filteredServices.length === 0 ? (
        <Typography variant="body1">No services found</Typography>
      ) : (
        filteredServices.map((service) => (
          <ServiceListItem key={service.serviceId} onClick={() => onServiceSelect(service)}>
            <ServiceItemContainer>
              <ServiceItemInfo>
                <ServiceItemBoldText variant="body1">{service.name}</ServiceItemBoldText>
                <Typography variant="body1">{service.description}</Typography>
              </ServiceItemInfo>
              <ServiceItemDetails>
                <ServiceItemBoldText variant="body1">{service.duration}</ServiceItemBoldText>
                <Typography variant="body1">${service.price}</Typography>
              </ServiceItemDetails>
            </ServiceItemContainer>
          </ServiceListItem>
        ))
      )}
    </React.Fragment>
  );
};

ServiceList.propTypes = {
  businessId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onServiceSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ServiceList;