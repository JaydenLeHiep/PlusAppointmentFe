import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Alert, Typography, IconButton, Collapse, Button } from '@mui/material';
import { useServicesContext } from '../../context/ServicesContext';
import { ListItem, ItemBoldText, ItemText } from '../../styles/CustomerStyle/ListItemStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceList = ({ businessId, onServiceSelect, searchQuery, selectedServices, onServiceDeselect }) => {
  const { services, fetchServices, loading, error } = useServicesContext();
  const [expandedService, setExpandedService] = useState(null);
  const isMobile = useMediaQuery('(max-width:500px)');

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

  const handleToggleExpand = (serviceId) => {
    setExpandedService(prev => (prev === serviceId ? null : serviceId));
  };

  const handleServiceClick = (service) => {
    onServiceSelect(service);
  };

  return (
    <React.Fragment>
      {filteredServices.map(service => (
        <ListItem
          key={service.serviceId}
          selected={isServiceSelected(service)}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <ItemBoldText>{service.name}</ItemBoldText>
            {isMobile && (
              <IconButton onClick={() => handleToggleExpand(service.serviceId)}>
                <ExpandMoreIcon
                  style={{
                    transform: expandedService === service.serviceId ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </IconButton>
            )}
          </Box>
          <Collapse in={!isMobile || expandedService === service.serviceId}>
            <ItemText>{service.duration}</ItemText>
            <ItemText>€{service.price}</ItemText>
            <ItemText>{service.description}</ItemText>
            {isMobile && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleServiceClick(service)}
                fullWidth
                style={{ marginTop: '8px' }}
              >
                Choose Service
              </Button>
            )}
          </Collapse>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default ServiceList;