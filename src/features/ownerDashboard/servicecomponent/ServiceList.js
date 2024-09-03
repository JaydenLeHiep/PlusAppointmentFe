import React, { useRef, useEffect, Fragment, useState } from 'react';
import { List, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ServiceForm from './ServiceForm';
import SearchBar from '../SearchBarContainer';
import { ListItemStyled, ListItemTextStyled } from '../../../styles/OwnerStyle/ServiceComponent/ServiceListStyles';

const ServiceList = ({
  services,
  editServiceId,
  handleEditService,
  confirmDeleteService,
  newService,
  setNewService,
  handleUpdateService,
  handleCancelForm,
}) => {
  const { t } = useTranslation('serviceList');
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (editServiceId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editServiceId]);

  // Filter services based on the search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Integrate the SearchBar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
      />

      <List>
        {filteredServices.map((service) => (
          <Fragment key={service.serviceId}>
            <ListItemStyled
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label={t('edit')} onClick={() => handleEditService(service)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label={t('delete')} onClick={() => confirmDeleteService(service.serviceId)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemTextStyled
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
            </ListItemStyled>
            {editServiceId === service.serviceId && (
              <Collapse in={editServiceId === service.serviceId}>
                <Box ref={formRef}>
                  <ServiceForm
                    title={t('updateServiceButton')}
                    newService={newService}
                    setNewService={setNewService}
                    handleAction={() => handleUpdateService(service.serviceId)}
                    handleCancelForm={handleCancelForm}
                    buttonText={t('updateServiceButton')}
                    buttonColor="#28a745"
                  />
                </Box>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ServiceList;