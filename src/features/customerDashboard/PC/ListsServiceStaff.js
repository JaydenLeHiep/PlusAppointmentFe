import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ServiceList from '../PC/ServiceList';
import StaffList from '../PC/StaffList';
import CustomerButtonDashboard from './CustomerButtonDashboard';
import { 
  CustomerListContainer, 
  CustomerListHeader, 
  StyledTextField 
} from '../../../styles/CustomerStyle/ListsServicesStaffStyle';

const ListsServiceStaff = ({ view, businessId, onServiceSelect, onStaffSelect, searchQuery, setSearchQuery, onViewChange }) => {
  const handleStaffSelect = (staff) => {
    onStaffSelect(staff);  // Use this to pass the selected staff up
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', padding: { xs: '0 16px', sm: '0 24px', md: '0' }, boxSizing: 'border-box' }}>
      <CustomerListHeader>
        <CustomerButtonDashboard view={view} onViewChange={onViewChange} />
        <StyledTextField
          placeholder="Search..."
          onChange={handleSearchChange}
          variant="outlined"
          value={searchQuery}
          InputProps={{
            startAdornment: (
              <SearchIcon />
            ),
          }}
          sx={{
            maxWidth: { xs: '100%', sm: '300px' },
            width: '100%',
            flex: '1 1 auto',
            marginRight: '70px'
          }}
        />
      </CustomerListHeader>
      <CustomerListContainer
        sx={{
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          backgroundImage: 'linear-gradient(to right, #ffffff, #f0f8ff)', // Soft gradient for a modern look
          border: '1px solid #e0e0e0', // Light border for a clean edge
        }}
      >
        {view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={searchQuery}
            onServiceSelect={onServiceSelect}
          />
        )}
        {view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={searchQuery}
            onStaffSelect={handleStaffSelect}
          />
        )}
      </CustomerListContainer>
    </Box>
  );
};

export default ListsServiceStaff;