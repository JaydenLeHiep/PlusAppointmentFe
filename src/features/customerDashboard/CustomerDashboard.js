import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

import ServiceList from '../servicecomponent/ServiceList';
import StaffList from '../staff/StaffList';
import CustomerForm from './CustomerForm';
import CustomButton from './CustomerButton';
import SearchCustomer from './SearchCustomer';
import AddAppointmentDialog from '../appointment/AddApointmentDialog';
import '../../styles/css/CustomerDashboard.css';
import { fetchBusinessesById } from '../../lib/apiClientBusiness';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');
  //const { fetchAppointmentsForBusiness } = useAppointmentsContext();

  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [showAddAppointmentDialog, setShowAddAppointmentDialog] = useState(false);

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

  const handleCustomerIdReceived = async (id) => {
    setCustomerId(id);
    setShowAddAppointmentDialog(true);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (selectedStaff) {
      setView('form');
    } else {
      setView('staffs');
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    if (selectedService) {
      setView('form');
    } else {
      setView('services');
    }
  };

  const handleServiceSearchChange = (e) => {
    setServiceSearchQuery(e.target.value);
  };

  const handleStaffSearchChange = (e) => {
    setStaffSearchQuery(e.target.value);
  };

  const handleCloseAddAppointmentDialog = () => {
    setShowAddAppointmentDialog(false);
  };

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

  return (
    <Box className="customer-dashboard">
      <Box className="business-info">
        <Typography variant="h5">{businessInfo.name}</Typography>
        <Typography variant="body1">Address: {businessInfo.address}</Typography>
        <Typography variant="body1">Phone: {businessInfo.phone}</Typography>
      </Box>
      <SearchCustomer onChange={view === 'services' ? handleServiceSearchChange : handleStaffSearchChange} />
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
      <Box className="list-container">
        {view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={serviceSearchQuery}
            onServiceSelect={handleServiceSelect}
          />
        )}
        {view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={staffSearchQuery}
            onStaffSelect={handleStaffSelect}
          />
        )}
      </Box>
      {view === 'form' && (
        <CustomerForm
          businessId={businessId}
          onCustomerIdReceived={handleCustomerIdReceived}
          selectedService={selectedService}
          selectedStaff={selectedStaff}
        />
      )}
      {showAddAppointmentDialog && (
        <AddAppointmentDialog
          open={showAddAppointmentDialog}
          onClose={handleCloseAddAppointmentDialog}
          businessId={businessId}
          customerId={customerId}
          serviceId={selectedService?.serviceId}
          staffId={selectedStaff?.staffId}
          
        />
      )}
    </Box>
  );
};

export default CustomerDashboard;
