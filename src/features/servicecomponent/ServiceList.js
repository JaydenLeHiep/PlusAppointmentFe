import React, { Fragment, useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ServiceForm from './ServiceForm';

const ServiceList = ({
  services,
  editServiceId,
  handleEditService,
  confirmDeleteService,
  newService,
  setNewService,
  handleUpdateService,
  handleCancelForm
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (editServiceId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editServiceId]);

  return (
    <List>
      {services.map((service) => (
        <Fragment key={service.serviceId}>
          <ListItem
            sx={{
              borderRadius: '8px',
              backgroundColor: '#f0f8ff',
              mb: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #1976d2',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#e6f1ff',
              },
            }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditService(service)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteService(service.serviceId)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {service.name}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    {service.description}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    {service.duration} - €{service.price}
                  </Typography>
                </>
              }
            />
          </ListItem>
          {/* Update Service Form - Only visible when editServiceId matches the current serviceId */}
          {editServiceId === service.serviceId && (
            <Collapse in={editServiceId === service.serviceId}>
              <Box ref={formRef}> {/* Reference for scrolling */}
                <ServiceForm
                  title="Update Service"
                  newService={newService}
                  setNewService={setNewService}
                  handleAction={() => handleUpdateService(service.serviceId)}
                  handleCancelForm={handleCancelForm}
                  buttonText="Update Service"
                  buttonColor="#28a745"
                />
              </Box>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default ServiceList;