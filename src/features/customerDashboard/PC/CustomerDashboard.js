import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ServiceList from './ServiceList';
import StaffList from './StaffList';
import MyDatePicker from './MyDatePicker';
import AppointmentOverviewPage from './AppointmentOverviewPage';
import CustomerForm from './CustomerForm';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { fetchBusinessesById } from '../../../lib/apiClientBusiness';
import { CustomerListContainer, CustomerListHeader, StyledTextField } from '../../../styles/CustomerStyle/CustomerDashboardStyle';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('business_id');

  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [overview, setOverview] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);

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
    setSelectedServices([...selectedServices, service]);
  };

  const handleNextFromServices = () => {
    if (selectedServices.length > 0) {
      setView('staffs');
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setView('calendar');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmTime = () => {
    if (selectedServices.length > 0 && selectedStaff && selectedDate && selectedTime) {
      const appointmentDetails = selectedServices.map(service => ({
        serviceName: service.name,
        staffName: selectedStaff.name,
        date: selectedDate,
        time: selectedTime,
        services: [
          {
            serviceId: service.serviceId,
            staffId: selectedStaff.staffId,
          }
        ]
      }));

      setSelectedAppointments([...selectedAppointments, ...appointmentDetails]);

      // Reset selections
      setSelectedServices([]);
      setSelectedStaff(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setOverview(true);
    }
  };

  const handleFinish = () => {
    console.log("Final selectedAppointments in CustomerDashboard before passing to CustomerForm:", selectedAppointments);
    setShowCustomerForm(true);
    setOverview(false);
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
    return (
      <CustomerForm
        selectedAppointments={selectedAppointments}
        businessId={businessId}
        onAppointmentSuccess={() => {
          // handle success here, maybe reset state or navigate away
        }}
      />
    );
  }

  if (overview) {
    return (
      <AppointmentOverviewPage
        selectedAppointments={selectedAppointments}
        onAddMoreServices={() => setView('services')}
        onFinish={handleFinish}
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

        <CustomerListHeader>
          <StyledTextField
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </CustomerListHeader>

        {view === 'services' && (
          <CustomerListContainer>
            <ServiceList
              businessId={businessId}
              searchQuery={searchQuery}
              onServiceSelect={handleServiceSelect}
            />
          </CustomerListContainer>
        )}

        {view === 'staffs' && (
          <CustomerListContainer>
            <StaffList
              businessId={businessId}
              searchQuery={searchQuery}
              onStaffSelect={handleStaffSelect}
            />
          </CustomerListContainer>
        )}

        {view === 'calendar' && (
          <MyDatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            onConfirmTime={handleConfirmTime}
            staffId={selectedStaff?.staffId}
          />
        )}

        {view === 'services' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextFromServices}
              disabled={selectedServices.length === 0}
              sx={{ fontWeight: 'bold' }}
            >
              Next
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CustomerDashboard;