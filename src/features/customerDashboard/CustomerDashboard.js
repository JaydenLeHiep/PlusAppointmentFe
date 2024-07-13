import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import ServiceList from '../servicecomponent/ServiceList';
import StaffList from '../staff/StaffList';
import CustomerForm from './CustomerForm';
import CustomButton from './CustomerButton';
import SearchCustomer from './SearchCustomer'; // Import SearchCustomer component
import '../../styles/css/CustomerDashboard.css';
import { fetchBusinessesById } from '../../lib/apiClientBusiness'; // Adjust path as per your project

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services'); // Default view is 'services'
  const [selectedService, setSelectedService] = useState(null); // State to track selected service
  const [selectedStaff, setSelectedStaff] = useState(null); // State to track selected staff
  const [serviceSearchQuery, setServiceSearchQuery] = useState(''); // State for service search
  const [staffSearchQuery, setStaffSearchQuery] = useState(''); // State for staff search

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) {
        setError('Business ID not provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBusinessesById(businessId);
        setBusinessInfo({
          name: data.name,
          address: data.address,
          phone: data.phone,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching business information');
        setLoading(false);
        console.error('Error fetching business:', error.message);
      }
    };

    fetchBusiness();
  }, [businessId]);

  if (!businessId) {
    return (
      <Box className="customer-dashboard">
        <Typography variant="h6">Error: Business ID not provided</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="customer-dashboard">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className="customer-dashboard">
        <CircularProgress />
      </Box>
    );
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setView('staffs'); // Switch to staff view
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setView('form'); // Switch to form view if staff selected
  };

  const handleServiceSearchChange = (e) => {
    setServiceSearchQuery(e.target.value); // Update service search query
  };

  const handleStaffSearchChange = (e) => {
    setStaffSearchQuery(e.target.value); // Update staff search query
  };

  return (
    <Box className="customer-dashboard">
      <Box className="business-info">
        <Typography variant="h5">{businessInfo.name}</Typography>
        <Typography variant="body1">Address: {businessInfo.address}</Typography>
        <Typography variant="body1">Phone: {businessInfo.phone}</Typography>
      </Box>
      <SearchCustomer onChange={view === 'services' ? handleServiceSearchChange : handleStaffSearchChange} />
      {!selectedService && !selectedStaff && (
        <Box className="button-group">
          <CustomButton
            variant={view === 'services' ? 'contained' : 'outlined'}
            color="primary"
            size="large"
            onClick={() => setView('services')}
          >
            Services
          </CustomButton>
          <CustomButton
            variant={view === 'staffs' ? 'contained' : 'outlined'}
            color="primary"
            size="large"
            onClick={() => setView('staffs')}
          >
            Staffs
          </CustomButton>
        </Box>
      )}
      <Box className="list-container">
        {!selectedService && view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={serviceSearchQuery} // Pass service search query
            onServiceSelect={handleServiceSelect}
          />
        )}
        {!selectedStaff && view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={staffSearchQuery} // Pass staff search query
            onStaffSelect={handleStaffSelect}
          />
        )}
      </Box>
      {selectedService && selectedStaff && (
        <>
          <Typography variant="h6">
            You want to book a {selectedService.name} with {selectedStaff.name}.
          </Typography>
          <CustomerForm />
        </>
      )}
    </Box>
  );
};

export default CustomerDashboard;
