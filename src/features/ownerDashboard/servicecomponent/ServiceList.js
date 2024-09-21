import React, { useRef, useEffect, Fragment, useState } from 'react';
import { List, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Import ChevronRightIcon
import { useTranslation } from 'react-i18next';
import ServiceForm from './ServiceForm';
import SearchBar from '../SearchBarContainer';
import {
  ListItemStyled,
  ListItemTextStyled,
  CategoryCardStyled,
  NoServicesTextStyled,
  ServiceNameStyled,
} from '../../../styles/OwnerStyle/ServiceComponent/ServiceListStyles';

const ServiceList = ({
  services,
  editServiceId,
  handleEditService,
  confirmDeleteService,
  newService,
  setNewService,
  handleUpdateService,
  handleCancelForm,
  categories,
}) => {
  const { t } = useTranslation('serviceList');
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState({});
  const [userOpenedCategories, setUserOpenedCategories] = useState({});

  useEffect(() => {
    if (editServiceId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editServiceId]);

  // Toggle open state for a category (only affecting user opened state)
  const toggleCategory = (categoryId) => {
    setUserOpenedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  // Automatically open/close categories based on the search query
  useEffect(() => {
    if (searchQuery === '') {
      // When the search query is empty, only retain the user-opened categories
      setOpenCategories({ ...userOpenedCategories });
    } else {
      const updatedOpenCategories = {};

      services.forEach((service) => {
        if (
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          // Open the category for the matching service
          updatedOpenCategories[service.categoryId] = true;
        }
      });

      setOpenCategories({
        ...updatedOpenCategories,
        ...userOpenedCategories, // Ensure user opened categories are preserved
      });
    }
  }, [searchQuery, services, userOpenedCategories]);

  // Filter services based on the search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group services by category
  const servicesByCategory = categories.map(category => ({
    category,
    services: filteredServices.filter(service => service.categoryId === category.categoryId),
  }));

  return (
    <Box>
      {/* Integrate the SearchBar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
      />

      <List>
        {servicesByCategory.map(({ category, services }) => (
          <Fragment key={category.categoryId}>
            {/* Category Header */}
            <CategoryCardStyled button onClick={() => toggleCategory(category.categoryId)}>
              <ListItemTextStyled
                primary={
                  <Typography variant="h6">
                    {category.name}
                  </Typography>
                }
              />
              {/* ChevronRightIcon with rotation animation */}
              <ChevronRightIcon
                style={{
                  transform: openCategories[category.categoryId] ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </CategoryCardStyled>

            {/* Services under the category */}
            <Collapse in={openCategories[category.categoryId]} timeout="auto" unmountOnExit>
              {services.length > 0 ? (
                services.map((service) => (
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
                          <ServiceNameStyled variant="body1" component="span">
                            {service.name}
                          </ServiceNameStyled>
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
                ))
              ) : (
                <NoServicesTextStyled>
                  {t('noServices')}
                </NoServicesTextStyled>
              )}
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
export default ServiceList;