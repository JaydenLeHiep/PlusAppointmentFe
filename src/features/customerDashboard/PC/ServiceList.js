import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';
import { useServicesContext } from '../../servicecomponent/ServicesContext';
import { ListItem, ItemBoldText, ItemText } from '../../../styles/CustomerStyle/ListItemStyles';

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
        <ListItem key={service.serviceId} onClick={() => onServiceSelect(service)}>
          <Box>
            <ItemBoldText>{service.name}</ItemBoldText>
          </Box>        
            <ItemText>{service.duration}</ItemText>
            <ItemText>€{service.price}</ItemText>   
        </ListItem>
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