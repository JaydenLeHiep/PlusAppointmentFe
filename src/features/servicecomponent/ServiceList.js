import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper } from '@mui/material';
import { fetchService } from '../../lib/apiClientServices'; // Adjust the path as per your project structure
import '../../styles/css/ServiceList.css'; // Ensure correct path to your CSS file

const ServiceList = ({ businessId }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchService(businessId);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      }
    };

    fetchServices();
  }, [businessId]);

  return (
    <div>
      <Typography variant="h6">Services</Typography>
      <List>
        {services.map((service) => (
          <ListItem key={service.serviceId}>
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
    </div>
  );
};

export default ServiceList;
