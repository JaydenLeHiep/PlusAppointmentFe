import React, {useState} from 'react';
import { Typography, Box, Button } from '@mui/material';
import SearchCustomer from './SearchCustomer';
import ServiceList from '../servicecomponent/ServiceList'; // Import ServiceList component
import StaffList from '../staff/StaffList';
import '../../styles/css/CustomerDashboard.css';

const CustomerDashboard = () => {
  const businessId = 6; // Replace with actual businessId retrieval logic if dynamic

  // State to track which list to show
  const [view, setView] = useState('services'); // Default view is 'services'

  return (
    <Box className="customer-dashboard">
      <Box className="business-info">
        <Typography variant="h5">Business Name</Typography>
        <Typography variant="body1">Address: 1234 Business St.</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
        {/* Add logo or other business info here */}
      </Box>
      <Box className="button-group">
        <Button
          variant={view === 'services' ? 'contained' : 'outlined'}
          color="primary"
          size="large"
          onClick={() => setView('services')} // Set view to 'services'
        >
          Services
        </Button>
        <Button
          variant={view === 'staffs' ? 'contained' : 'outlined'}
          size="large"
          className="dashboard-button"
          onClick={() => setView('staffs')} // Set view to 'staffs'
        >
          Staffs
        </Button>
      </Box>
      <Box className="search-box">
        <SearchCustomer />
      </Box>
      <Box className="list-container">
        {view === 'services' && <ServiceList businessId={businessId} />}
        {view === 'staffs' && <StaffList businessId={businessId} />}
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
