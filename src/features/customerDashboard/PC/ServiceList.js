import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, CircularProgress, Alert, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useServicesContext } from '../../servicecomponent/ServicesContext';

// Styled components using MUI's styled function
const ServiceListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
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
  boxSizing: 'border-box',
  border: '1px solid #e0e0e0',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));


const ItemBoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(1),
}));

const ItemText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1.1rem',
  marginBottom: theme.spacing(0.5),
}));

const ServiceList = ({ businessId, onServiceSelect, searchQuery }) => {
  const { services, fetchServices, loading, error } = useServicesContext();

  useEffect(() => {
    if (businessId && services.length === 0) {
      fetchServices(businessId);
    }
  }, [businessId, fetchServices, services.length]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredServices.length === 0) {
    return <Typography variant="body1">No services found</Typography>;
  }

  return (
    <React.Fragment>
      {filteredServices.map(service => (
        <ServiceListItem key={service.serviceId} onClick={() => onServiceSelect(service)}>
          <Box>
            <ItemBoldText>{service.name}</ItemBoldText>
          </Box>        
            <ItemText>{service.duration}</ItemText>
            <ItemText>€{service.price}</ItemText>   
        </ServiceListItem>
      ))}
    </React.Fragment>
  );
};

ServiceList.propTypes = {
  businessId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onServiceSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ServiceList;