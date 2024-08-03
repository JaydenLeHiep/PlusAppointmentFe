import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItem, Paper, CircularProgress, Alert } from '@mui/material';
import { useServicesContext } from '../servicecomponent/ServicesContext'; 
import '../../styles/css/ServiceList.css'; 

const ServiceList = ({ businessId, onServiceSelect, searchQuery }) => {
  const { services, fetchServices, loading, error } = useServicesContext();  // Access state and actions from context

  useEffect(() => {
    if (businessId) {
      fetchServices(businessId);  // Fetch services using the context when businessId is provided
    }
  }, [businessId, fetchServices]);

  if (loading) {
    return <CircularProgress />;  // Display loading indicator while fetching data
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;  // Display error message if there's an error
  }

  // Filter services based on search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h6">Services</Typography>
      {filteredServices.length === 0 ? (
        <Typography variant="body1">No services found</Typography>
      ) : (
        <List>
          {filteredServices.map((service) => (
            <ListItem key={service.serviceId} button onClick={() => onServiceSelect(service)}>
              <Paper className="service-item">
                <div className="service-container">
                  <div className="service-info">
                    <Typography variant="body1" className="bold-text">{service.name}</Typography>
                    <Typography variant="body1">{service.description}</Typography>
                  </div>
                  <div className="service-details">
                    <Typography variant="body1" className="bold-text">{service.duration}</Typography>
                    <Typography variant="body1">${service.price}</Typography>
                  </div>
                </div>
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

ServiceList.propTypes = {
  businessId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onServiceSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ServiceList;
