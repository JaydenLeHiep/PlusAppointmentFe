import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ListsServiceStaff from './ListsServiceStaff';
import MyDatePicker from './MyDatePicker';
import AppointmentOverviewPage from './AppointmentOverviewPage'; // Import the new page component
import CustomerForm from './CustomerForm'; // Import the CustomerForm component
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]); // State to hold the list of selected appointments
  const [overview, setOverview] = useState(false); // State to manage the overview page view
  const [showCustomerForm, setShowCustomerForm] = useState(false); // State to control CustomerForm view

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

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (selectedStaff) {
      setView('calendar');
    } else {
      setView('staffs');
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    if (selectedService) {
      setView('calendar');
    } else {
      setView('services');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setView('calendar');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmTime = () => {
    if (selectedService && selectedStaff && selectedDate && selectedTime) {
      // Add the selected appointment to the list
      setSelectedAppointments([
        ...selectedAppointments,
        {
          serviceName: selectedService.name,
          staffName: selectedStaff.name,
          date: selectedDate,
          time: selectedTime,
        },
      ]);
      // Reset selections
      setSelectedService(null);
      setSelectedStaff(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setView('services'); // Go back to service selection for the next appointment
    }
  };

  const handleViewOverview = () => {
    setOverview(true); // Trigger to view the overview page
  };

  const handleAddMoreServices = () => {
    setView('services'); // Allow adding more services
    setOverview(false);
  };

  const handleFinish = () => {
    setShowCustomerForm(true); // Show the CustomerForm when "Finish" is clicked
    setOverview(false); // Hide the overview
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

  if (showCustomerForm) {
    return <CustomerForm />;
  }

  if (overview) {
    return (
      <AppointmentOverviewPage
        selectedAppointments={selectedAppointments}
        onAddMoreServices={handleAddMoreServices}
        onFinish={handleFinish} // Use the new handleFinish function
      />
    );
  }

  return (
    <Box minHeight="100vh" sx={{ backgroundColor: '#f0f8ff' }}>
      <Container>
        <CustomerBusinessInfo
          businessInfo={businessInfo}
          view={view}
          onBackClick={() => setView('services')}
        />
        
        {selectedAppointments.length > 0 && view === 'services' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewOverview}
              sx={{ fontWeight: 'bold' }}
            >
              View Appointment Overview
            </Button>
          </Box>
        )}
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
              onStaffSelect={handleStaffSelect}
            />
          ) : (
            <MyDatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
              onConfirmTime={handleConfirmTime}
              staffId={selectedStaff?.staffId}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CustomerDashboard;