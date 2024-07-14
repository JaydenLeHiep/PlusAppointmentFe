// ListsCustomer.js
import React from 'react';
import { Box } from '@mui/material';
import ServiceList from '../servicecomponent/ServiceList';
import StaffList from '../staff/StaffList';

const ListsServiceStaff = ({ view, businessId, serviceSearchQuery, staffSearchQuery, onServiceSelect, onStaffSelect }) => {
  return (
    <Box className="list-container">
      {view === 'services' && (
        <ServiceList
          businessId={businessId}
          searchQuery={serviceSearchQuery}
          onServiceSelect={onServiceSelect}
        />
      )}
      {view === 'staffs' && (
        <StaffList
          businessId={businessId}
          searchQuery={staffSearchQuery}
          onStaffSelect={onStaffSelect}
        />
      )}
    </Box>
  );
};

export default ListsServiceStaff;
