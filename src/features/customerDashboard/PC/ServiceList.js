import React, { useEffect } from 'react';
import { CircularProgress, Box, Alert, Typography } from '@mui/material';
import { useServicesContext } from '../../../context/ServicesContext';
import { ListItem, ItemBoldText, ItemText } from '../../../styles/CustomerStyle/ListItemStyles';

const ServiceList = ({ businessId, onServiceSelect, searchQuery, selectedServices, onServiceDeselect }) => {
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

  const isServiceSelected = (service) => {
    return selectedServices.some(selectedService => selectedService.serviceId === service.serviceId);
  };

  const handleServiceClick = (service) => {
    if (isServiceSelected(service)) {
      // Deselect service
      onServiceDeselect(service);
    } else {
      // Select service
      onServiceSelect(service);
    }
  };

  return (
    <React.Fragment>
      {filteredServices.map(service => (
        <ListItem
          key={service.serviceId}
          onClick={() => handleServiceClick(service)}
          selected={isServiceSelected(service)} // Pass selected prop for styling
        >
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

export default ServiceList;