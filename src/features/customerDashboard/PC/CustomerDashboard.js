import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ServiceList from './ServiceList';
import StaffList from './StaffList';
import MyDatePicker from './MyDatePicker';
import AppointmentOverviewPage from './AppointmentOverviewPage';
import CustomerForm from './CustomerForm';
import { fetchBusinessesById } from '../../../lib/apiClientBusiness';
import { CustomerListContainer } from '../../../styles/CustomerStyle/CustomerDashboardStyle';
import BackAndNextButtons from './BackNextButtons';

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

  const handleServiceDeselect = (service) => {
    setSelectedServices(selectedServices.filter(s => s.serviceId !== service.serviceId));
  };

  const handleNextFromServices = () => {
    if (selectedServices.length > 0) {
      setView('staffs');
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setView('calendar'); // Automatically move to calendar view after selecting staff
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
      const appointmentDetails = selectedServices.map(service => {
        const appointmentTime = `${selectedDate.format('YYYY-MM-DD')}T${selectedTime.substring(11, 16)}`;

        return {
          serviceName: service.name,
          staffName: selectedStaff.name,
          appointmentTime: appointmentTime,
          services: [
            {
              serviceId: service.serviceId,
              staffId: selectedStaff.staffId,
              duration: service.duration,
              price: service.price,
            }
          ]
        };
      });

      const uniqueAppointments = [...selectedAppointments];

      appointmentDetails.forEach(newAppointment => {
        const isDuplicate = uniqueAppointments.some(existingAppointment =>
          existingAppointment.services[0].serviceId === newAppointment.services[0].serviceId &&
          existingAppointment.services[0].staffId === newAppointment.services[0].staffId &&
          existingAppointment.appointmentTime === newAppointment.appointmentTime
        );

        if (!isDuplicate) {
          uniqueAppointments.push(newAppointment);
        }
      });

      setSelectedAppointments(uniqueAppointments);
      setView('overview'); // Automatically move to overview view after confirming time
    }
  };

  const handleFinish = () => {
    setView('customerForm');
  };

  const handleBackClick = () => {
    switch (view) {
      case 'staffs':
        setView('services');
        break;
      case 'calendar':
        setView('staffs');
        break;
      case 'overview':
        setView('calendar');
        break;
      case 'customerForm':
        setView('overview');
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    if (view === 'services') {
      handleNextFromServices();
    } else if (view === 'calendar') {
      handleConfirmTime();
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
        />

        <BackAndNextButtons
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          disableBack={view === 'services'}
          disableNext={view !== 'services' || selectedServices.length === 0}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          view={view}
        />

        {view === 'services' && (
          <CustomerListContainer>
            <ServiceList
              businessId={businessId}
              searchQuery={searchQuery}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
              onServiceDeselect={handleServiceDeselect}
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

        {view === 'overview' && (
          <AppointmentOverviewPage
            selectedAppointments={selectedAppointments}
            onAddMoreServices={() => setView('services')}
            onFinish={handleFinish}
          />
        )}

        {view === 'customerForm' && (
          <CustomerForm
            selectedAppointments={selectedAppointments}
            businessId={businessId}
            onAppointmentSuccess={() => {

            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default CustomerDashboard;