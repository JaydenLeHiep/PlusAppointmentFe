import React from 'react';
import { Box, Typography } from '@mui/material';
import ServiceList from '../servicecomponent/ServiceList';
import StaffList from '../staff/StaffList';
import '../../styles/css/CustomerCss/ListsServiceStaff.css';

const ListsServiceStaff = ({ view, businessId, serviceSearchQuery, staffSearchQuery, onServiceSelect, onStaffSelect }) => {
  return (
    <Box className="list-container">
      <Typography className="list-title">
        {view === 'services' ? 'Available Services' : 'Available Staff'}
      </Typography>
      <Box className="list-content">
        {view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={serviceSearchQuery}
            onServiceSelect={onServiceSelect}
            itemClassName="service-list-item"
          />
        )}
        {view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={staffSearchQuery}
            onStaffSelect={onStaffSelect}
            itemClassName="staff-list-item" 
          />
        )}
      </Box>
    </Box>
  );
};

export default ListsServiceStaff;