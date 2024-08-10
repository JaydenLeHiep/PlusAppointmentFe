import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Card, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

import CustomerBusinessInfo from './CustomerBusinessInfo';
import CustomerButtonDashboard from './CustomerButtonDashboard';
import ListsServiceStaff from './ListsServiceStaff';
import CustomerForm from './CustomerForm';
import SearchCustomer from './SearchCustomer';
import AddAppointmentDialog from '../appointment/AddApointmentDialog';
import { fetchBusinessesById } from '../../lib/apiClientBusiness';
import '../../styles/css/CustomerCss/CustomerDashboard.css';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

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
      <Box className="customer-dashboard" sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#ff1744' }}>Error: Business ID not provided</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="customer-dashboard" sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#ff1744' }}>{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className="customer-dashboard" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
  <Box className="customer-dashboard-hero">
    <Container className="customer-business-info-container">
      <CustomerBusinessInfo businessInfo={businessInfo} />
    </Container>
  </Box>
  <Box className="customer-dashboard-hero">
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '82vh', paddingTop: 0, marginTop: 0 }}
    >
      <Card className="customer-dashboard-container">
        {!showAddAppointmentDialog && view !== 'form' && (
          <>
            <SearchCustomer onChange={view === 'services' ? handleServiceSearchChange : handleStaffSearchChange} />
            <CustomerButtonDashboard view={view} onViewChange={setView} />
          </>
        )}
        <ListsServiceStaff
          view={view}
          businessId={businessId}
          serviceSearchQuery={serviceSearchQuery}
          staffSearchQuery={staffSearchQuery}
          onServiceSelect={handleServiceSelect}
          onStaffSelect={handleStaffSelect}
        />
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
      </Card>
    </Container>
  </Box>
</Box>
  );
};

export default CustomerDashboard;