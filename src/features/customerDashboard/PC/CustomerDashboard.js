import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ListsServiceStaff from './ListsServiceStaff';
import CustomerForm from './CustomerForm';
import { fetchBusinessesById } from '../../../lib/apiClientBusiness';
import MyDatePicker from './MyDatePicker';
import { useLocation } from 'react-router-dom';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [setCustomerId] = useState(null);
  const [setShowAddAppointmentDialog] = useState(false);

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
      setView('calendar');
    } else {
      setView('staffs');
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff); // Set the selected staff here
    if (selectedService) {
      setView('calendar');
    } else {
      setView('services');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset the selected time when date changes
    setView('calendar');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmTime = () => {
    setView('form');
  };

  const handleBackClick = () => {
    if (view === 'calendar') {
      setView(selectedService && !selectedStaff ? 'staffs' : 'services');
      setSelectedDate(null);
      setSelectedTime(null);
    } else if (view === 'staffs') {
      setView('services');
    }
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
    <Box minHeight="100vh" sx={{ backgroundColor: '#f0f8ff' }}>
      <Container>
        <CustomerBusinessInfo
          businessInfo={businessInfo}
          view={view}
          onBackClick={handleBackClick}
        />
      </Container>

      {/* Content Section: Conditional Rendering */}
      <Box sx={{
        backgroundColor: '#f0f8ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '82vh',
        padding: { xs: '10px', md: '20px' },
      }}>
        <Container>
          {view === 'services' || view === 'staffs' ? (
            <ListsServiceStaff
              view={view}
              businessId={businessId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onViewChange={setView}
              onServiceSelect={handleServiceSelect}
              onStaffSelect={handleStaffSelect} // Pass the handler down
            />
          ) : (
            <>
              <MyDatePicker
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                onConfirmTime={handleConfirmTime}
                staffId={selectedStaff?.staffId} // Pass the selected staff ID to MyDatePicker
              />
              {selectedDate && selectedTime && view === 'form' && (
                <Box sx={{ marginTop: 8 }}>
                  <CustomerForm
                    businessId={businessId}
                    onCustomerIdReceived={handleCustomerIdReceived}
                    selectedService={selectedService}
                    selectedStaff={selectedStaff}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;