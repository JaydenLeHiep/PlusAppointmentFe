import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Alert, Typography, IconButton, Collapse } from '@mui/material';
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
    if (isServiceSelected(service)) {
      onServiceDeselect(service);
    } else {
      onServiceSelect(service);
    }
  };

  return (
    <React.Fragment>
      {filteredServices.map(service => (
        <ListItem
          key={service.serviceId}
          selected={isServiceSelected(service)}
          onClick={() => handleServiceClick(service)} // Toggle selection on click
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <ItemBoldText>{service.name}</ItemBoldText>
            {isMobile && (
              <IconButton onClick={(e) => { e.stopPropagation(); handleToggleExpand(service.serviceId); }}>
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
          </Collapse>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default ServiceList;