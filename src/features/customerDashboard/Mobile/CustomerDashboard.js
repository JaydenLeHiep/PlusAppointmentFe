import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from './CustomerBusinessInfo';
import ServiceList from './ServiceList';
import StaffList from './StaffList';
import MyDatePicker from './MyDatePicker';
import AppointmentOverviewPage from './AppointmentOverviewPage';
import OldCustomerForm from './OldCustomerForm';
import NewCustomerForm from './NewCustomerForm';
import ThankYou from './ThankYou';
import { fetchBusinessesById } from '../../../lib/apiClientBusiness';
import {
  DashboardContainer,
  ErrorContainer,
  LoadingContainer,
  ErrorTypography,
  CustomCircularProgress,
  CustomContainer,
  CustomerListContainer
} from '../../../styles/CustomerStyle/MobileVersion/CustomerDashboardStyle'; 
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
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);

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
      setView('overview');
    }
  };

  const handleFinish = () => {
    setView('customerForm');
  };

  const handleBackClick = () => {
    if (isAddingNewCustomer) {
      setIsAddingNewCustomer(false);
    } else {
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
    }
  };

  const handleNextClick = () => {
    if (view === 'services') {
      handleNextFromServices();
    } else if (view === 'calendar') {
      handleConfirmTime();
    }
  };

  const handleNewCustomerSuccess = () => {
    setIsAddingNewCustomer(false);
  };

  const handleAppointmentSuccess = () => {
    setView('thankYou');
  };

  if (!businessId) {
    return (
      <ErrorContainer>
        <ErrorTypography variant="h6">
          Error: Business ID not provided
        </ErrorTypography>
      </ErrorContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorTypography variant="h6">
          {error}
        </ErrorTypography>
      </ErrorContainer>
    );
  }

  if (loading) {
    return (
      <LoadingContainer>
        <CustomCircularProgress />
      </LoadingContainer>
    );
  }

  // Function to parse the duration string in the format "HH:MM:SS"
  const parseDuration = (durationString) => {
    const [hours, minutes] = durationString.split(':').map(Number);

    // Convert hours and minutes into total minutes
    const totalMinutes = (hours * 60) + minutes;

    return totalMinutes;
  };

  // Calculate the total duration of selected services
  const totalDuration = selectedServices.reduce((sum, service) => {
    const parsedDuration = parseDuration(service.duration);
    return sum + parsedDuration;
  }, 0);

  return (
    <DashboardContainer>
      <CustomerBusinessInfo businessInfo={businessInfo} />

      <CustomContainer>
        <BackAndNextButtons
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          disableBack={view === 'services'}
          disableNext={view !== 'services' || selectedServices.length === 0}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          view={view}
          isAddingNewCustomer={isAddingNewCustomer}
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
            totalDuration={totalDuration}
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
          !isAddingNewCustomer ? (
            <OldCustomerForm
              selectedAppointments={selectedAppointments}
              businessId={businessId}
              onAppointmentSuccess={handleAppointmentSuccess}
              onNewCustomer={() => setIsAddingNewCustomer(true)}
            />
          ) : (
            <NewCustomerForm
              businessId={businessId}
              onCustomerAdded={handleNewCustomerSuccess}
            />
          )
        )}

        {view === 'thankYou' && <ThankYou />}
      </CustomContainer>
    </DashboardContainer>
  );
};

export default CustomerDashboard;