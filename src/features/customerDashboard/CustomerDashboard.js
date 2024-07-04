import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import SearchCustomer from './SearchCustomer';
import ServiceList from '../servicecomponent/ServiceList';
import StaffList from '../staff/StaffList';
import '../../styles/css/CustomerDashboard.css';
import { fetchBusinessesById } from '../../lib/apiClientBusiness'; // Adjust path as per your project

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

  // State to track business information, loading, and error states
  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services'); // Default view is 'services'

  useEffect(() => {
    // Fetch business details only if businessId is provided
    const fetchBusiness = async () => {
      if (!businessId) {
        setError('Business ID not provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBusinessesById(businessId); // Call the correct function here
        setBusinessInfo({
          name: data.name,
          address: data.address,
          phone: data.phone,
          // Add more fields as needed
        });
        setLoading(false); // Mark loading as complete
      } catch (error) {
        setError('Error fetching business information');
        setLoading(false);
        console.error('Error fetching business:', error.message);
      }
    };

    fetchBusiness();
  }, [businessId]);

  // If businessId is not provided, show error message
  if (!businessId) {
    return (
      <Box className="customer-dashboard">
        <Typography variant="h6">Error: Business ID not provided</Typography>
      </Box>
    );
  }

  // If there's an error fetching business info, display error message
  if (error) {
    return (
      <Box className="customer-dashboard">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  // While loading, display a loading indicator
  if (loading) {
    return (
      <Box className="customer-dashboard">
        <CircularProgress />
      </Box>
    );
  }

  // Render the dashboard with business information once fetched
  return (
    <Box className="customer-dashboard">
      <Box className="business-info">
        <Typography variant="h5">{businessInfo.name}</Typography>
        <Typography variant="body1">Address: {businessInfo.address}</Typography>
        <Typography variant="body1">Phone: {businessInfo.phone}</Typography>
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
          color="primary"
          size="large"
          onClick={() => setView('staffs')} // Set view to 'staffs'
        >
          Staffs
        </Button>
      </Box>
      <Box className="search-box">
        <SearchCustomer />
      </Box>
      <Box className="list-container">
        {/* Display ServiceList and StaffList components based on view */}
        {view === 'services' && <ServiceList businessId={businessId} />}
        {view === 'staffs' && <StaffList businessId={businessId} />}
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
