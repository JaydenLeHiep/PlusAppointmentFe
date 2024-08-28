import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert, Collapse, List } from '@mui/material';
import { useServicesContext } from '../../context/ServicesContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  CategoryHeader,
  ServiceItem,
  CategoryText,
  ServiceText,
  ServiceListContainer,
  ExpandIcon,
} from '../../styles/CustomerStyle/ServiceListStyle';
import { IconButton, Typography } from '@mui/material';

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

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredServices.length === 0) {
    return <Typography variant="body1">No services found</Typography>;
  }

  const isServiceSelected = (service) => {
    return selectedServices.some(selectedService => selectedService.serviceId === service.serviceId);
  };

  const handleCategoryToggle = (categoryId) => {
    setExpandedCategoryId(prevCategoryId => prevCategoryId === categoryId ? null : categoryId);
  };

  const handleServiceClick = (service) => {
    if (isServiceSelected(service)) {
      onServiceDeselect(service);
    } else {
      onServiceSelect(service);
    }
  };

  const handleToggleExpand = (serviceId) => {
    setExpandedService(prev => (prev === serviceId ? null : serviceId));
  };

  return (
    <List>
      <React.Fragment key={category.categoryId}>
        <CategoryHeader button onClick={() => handleCategoryToggle(category.categoryId)}>
          <CategoryText>
            {category.name}
          </CategoryText>
          <ExpandIcon expanded={expandedCategoryId === category.categoryId}>
            {expandedCategoryId === category.categoryId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ExpandIcon>
        </CategoryHeader>
        <Collapse in={expandedCategoryId === category.categoryId}>
          {filteredServices
            .filter(service => service.categoryId === category.categoryId)
            .map(service => (
              <ServiceItem
                key={service.serviceId}
                selected={isServiceSelected(service)}
                onClick={() => handleServiceClick(service)}
              >
                <ServiceListContainer>
                  <CategoryText>{service.name}</CategoryText>
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