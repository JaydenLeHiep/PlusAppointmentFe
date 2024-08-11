import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceList from '../PC/ServiceList';
import StaffList from '../PC/StaffList';

// Styled components using MUI's styled function
const CustomerListContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid
  gap: theme.spacing(3),
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)', // Subtle hover lift effect
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on medium screens
    padding: theme.spacing(3), // Adjust padding for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // Single column on small screens
    padding: theme.spacing(2), // Adjust padding for small screens
    gap: theme.spacing(2), // Reduce gap for small screens
    margin: theme.spacing(1), // Adjust margin for small screens
    borderRadius: '8px', // Smaller border radius for small screens
  },
}));

const CustomerListTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  fontWeight: 'bold',
  color: '#1976d2',
  fontSize: '1.75rem',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem', // Slightly smaller font size on small screens
  },
}));

const ListsServiceStaff = ({ view, businessId, serviceSearchQuery, staffSearchQuery, onServiceSelect, onStaffSelect }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: 'auto', marginBottom: '40px', padding: { xs: '0 16px', sm: '0 24px', md: '0' } }}>
      <CustomerListTitle variant="h5">
        {view === 'services' ? 'Available Services' : 'Available Staff'}
      </CustomerListTitle>
      <CustomerListContainer>
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
      </CustomerListContainer>
    </Box>
  );
};

export default ListsServiceStaff;