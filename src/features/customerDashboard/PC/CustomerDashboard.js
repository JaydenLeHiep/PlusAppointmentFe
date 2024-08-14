import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ListsServiceStaff from './ListsServiceStaff';
import CustomerForm from './CustomerForm';
import AddAppointmentDialog from '../../appointment/AddAppointment/AddAppointmentDialog';
import { fetchBusinessesById } from '../../../lib/apiClientBusiness';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
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

  const handleCloseAddAppointmentDialog = () => {
    setShowAddAppointmentDialog(false);
  };

  if (!businessId) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#ff1744' }}>Error: Business ID not provided</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h6" sx={{ color: '#ff1744' }}>{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Top Section: Business Information */}
      <Box sx={{ backgroundColor: '#f0f8ff', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Container>
          <CustomerBusinessInfo businessInfo={businessInfo} />
        </Container>
      </Box>

      {/* Content Section: Lists Service Staff */}
      <Box sx={{ 
        backgroundColor: '#f0f8ff', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '82vh', 
        padding: { xs: '10px', md: '20px' }, 
      }}>
        <Container>
          <ListsServiceStaff
            view={view}
            businessId={businessId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onViewChange={setView}
            onServiceSelect={handleServiceSelect}
            onStaffSelect={handleStaffSelect}
          />
        </Container>
      </Box>

      {/* Add Appointment Dialog */}
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
