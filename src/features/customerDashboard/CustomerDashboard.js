import React from 'react';
import { Typography, Box, Button} from '@mui/material';
import SearchCustomer from './SearchCustomer';
import '../../styles/css/CustomerDashboard.css';

const CustomerDashboard = () => {
  return (
    <Box className="customer-dashboard">
      <Box className="business-info">
        <Typography variant="h5">Business Name</Typography>
        <Typography variant="body1">Address: 1234 Business St.</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
        {/* Add logo or other business info here */}
      </Box>
      <Box className="button-group">
        <Button variant="contained" color="primary" size="large">
          Services
        </Button>
        <Button variant="outlined" size="large" className="dashboard-button">
          Staffs
        </Button>
      </Box>
      <Box className="search-box">
        <SearchCustomer />
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
