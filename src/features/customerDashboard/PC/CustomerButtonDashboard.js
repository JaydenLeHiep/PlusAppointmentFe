import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled button using MUI's styled function
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2', // Primary blue color
  color: '#fff', // Text color for active buttons
  padding: theme.spacing(1.5, 3), // Padding adjusted for better proportions
  fontSize: '14px', // Slightly smaller font size
  fontWeight: 'bold',
  borderRadius: '8px', // Reduced border-radius for a sharper look
  textTransform: 'none',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for a less bulky feel
  minWidth: '120px', // Set a minimum width for buttons
  width: '150px', // Set specific width to prevent buttons from stretching too wide
  '&:hover': {
    backgroundColor: '#115293',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)', // Subtle lift effect on hover
  },
  '&:active': {
    backgroundColor: '#0e3c71',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(0)', // Reset lift effect
  },
  '&.MuiButton-outlined': {
    borderColor: '#1976d2', // Border color for outlined variant
    color: '#1976d2', // Text color for outlined variant
    backgroundColor: '#f0f0f0', // Light gray background for inactive state
  },
  '&.MuiButton-contained': {
    color: '#fff', // Ensure text color is white when contained
  },
}));

// Styled ButtonGroup container
const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2), // Space between buttons
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

// Main CustomerButtonDashboard component
const CustomerButtonDashboard = ({ view, onViewChange }) => {
  return (
    <ButtonGroup>
      <CustomButton
        variant={view === 'services' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('services')}
      >
        Services
      </CustomButton>
      <CustomButton
        variant={view === 'staffs' ? 'contained' : 'outlined'}
        onClick={() => onViewChange('staffs')}
      >
        Staffs
      </CustomButton>
    </ButtonGroup>
  );
};

export default CustomerButtonDashboard;