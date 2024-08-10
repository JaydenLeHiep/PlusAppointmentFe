import React from 'react';
import { Box, Typography } from '@mui/material';
import ServiceList from '../customerDashboard/ServiceList';
import StaffList from '../customerDashboard/StaffList';
import '../../styles/css/CustomerCss/ListsServiceStaff.css';

const ListsServiceStaff = ({ view, businessId, serviceSearchQuery, staffSearchQuery, onServiceSelect, onStaffSelect }) => {
  return (
    <Box className="customer-list-container">
      <Typography variant="h5" className="customer-list-title">
        {view === 'services' ? 'Available Services' : 'Available Staff'}
      </Typography>
      <Box className="customer-list-content">
        {view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={serviceSearchQuery}
            onServiceSelect={onServiceSelect}
            itemClassName="customer-service-item"
          />
        )}
        {view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={staffSearchQuery}
            onStaffSelect={onStaffSelect}
            itemClassName="customer-staff-item" 
          />
        )}
      </Box>
    </Box>
  );
};

export default ListsServiceStaff;