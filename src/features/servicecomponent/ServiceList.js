// ServiceList.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItem, Paper, CircularProgress } from '@mui/material';
import { fetchService } from '../../lib/apiClientServices'; // Adjust path as per your project structure
import '../../styles/css/ServiceList.css'; // Ensure correct path to your CSS file

const ServiceList = ({ businessId, onServiceSelect, searchQuery }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchService(businessId);
        setServices(data);
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchServices();
  }, [businessId]);

  if (loading) {
    return <CircularProgress />; // Display loading indicator while fetching data
  }

  // Filter services based on search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h6">Services</Typography>
      <List>
        {filteredServices.length === 0 ? (
          <Typography variant="body1">No services found</Typography>
        ) : (
          filteredServices.map((service) => (
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
          ))
        )}
      </List>
    </div>
  );
};

ServiceList.propTypes = {
  businessId: PropTypes.string.isRequired,
  onServiceSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ServiceList;
