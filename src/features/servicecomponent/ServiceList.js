import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, Stack } from '@mui/material';
import { fetchService } from '../../lib/apiClientServices'; // Adjust the path as per your project structure

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
            <Paper style={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
              <Stack spacing={1}>
                <Typography variant="h6">{service.name}</Typography>
                
                <Typography>Description: {service.description}</Typography>
                <Typography>Duration: {service.duration}</Typography>
                <Typography>Price: ${service.price}</Typography>
                {/* Add more details as needed */}
              </Stack>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ServiceList;
