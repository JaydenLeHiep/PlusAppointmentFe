import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert, Collapse, List } from '@mui/material';
import { useServicesContext } from '../../context/ServicesContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  CategoryHeader,
  ServiceItem,
  CategoryText,
  ServiceText,
  ServiceListContainer,
  ServiceTextBlack
} from '../../styles/CustomerStyle/ServiceListStyle';
import { IconButton, Typography } from '@mui/material';
import HeartsAnimation from '../../styles/CustomerStyle/HeartsAnimation';

const ServiceList = ({
  businessId,
  onServiceSelect,
  searchQuery,
  selectedServices,
  onServiceDeselect,
  category,
  expandedCategoryId,
  setExpandedCategoryId,
}) => {

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

  // Filter services based on the search query
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredServices.length === 0) {
    return <Typography variant="body1">No services found</Typography>;
  }

  // Filter out categories that have no services
  const servicesInCategory = filteredServices.filter(
    service => service.categoryId === category.categoryId
  );
  if (servicesInCategory.length === 0) {
    return null; // Don't render the category if there are no services in it
  }

  const isServiceSelected = (service) => {
    return selectedServices.some(
      (selectedService) => selectedService.serviceId === service.serviceId
    );
  };

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategoryId((prevCategoryId) =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  const handleServiceClick = (service) => {
    if (isServiceSelected(service)) {
      onServiceDeselect(service);
    } else {
      onServiceSelect(service);
    }
  };

  const handleToggleExpand = (serviceId) => {
    setExpandedService((prev) => (prev === serviceId ? null : serviceId));
  };

  return (
    <List>
      <React.Fragment key={category.categoryId}>
        <CategoryHeader button onClick={() => handleCategoryToggle(category.categoryId)}>
          {/* Fireworks overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <HeartsAnimation />
          </div>
          {/* Main content */}
          <CategoryText>{category.name}</CategoryText>
          <ChevronRightIcon
            style={{
              transform: expandedCategoryId === category.categoryId ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </CategoryHeader>
        <Collapse in={expandedCategoryId === category.categoryId}>
          {servicesInCategory.map(service => (
            <ServiceItem
              key={service.serviceId}
              selected={isServiceSelected(service)}
              onClick={() => handleServiceClick(service)}
            >
              <ServiceListContainer>
                <ServiceTextBlack>{service.name}</ServiceTextBlack>
                {isMobile && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleExpand(service.serviceId);
                    }}
                  >
                    <ChevronRightIcon
                      style={{
                        transform: expandedService === service.serviceId ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </IconButton>
                )}
              </ServiceListContainer>
              <Collapse in={!isMobile || expandedService === service.serviceId}>
                <ServiceText>{service.duration}</ServiceText>
                <ServiceText>€{service.price}</ServiceText>
                <ServiceText>{service.description}</ServiceText>
              </Collapse>
            </ServiceItem>
          ))}
        </Collapse>
      </React.Fragment>
    </List>
  );
};

export default ServiceList;