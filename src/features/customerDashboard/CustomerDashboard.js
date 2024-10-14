import React, { useState, useEffect, useRef } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import CustomerBusinessInfo from './CustomerBusinessInfo';
import ServiceList from './ServiceList';
import StaffList from './StaffList';
import MyDatePicker from './MyDatePicker';
import AppointmentOverviewPage from './AppointmentOverviewPage';
import OldCustomerForm from './OldCustomerForm';
import NewCustomerForm from './NewCustomerForm';
import ThankYou from './ThankYou';
import { fetchBusinessesByName } from '../../lib/apiClientBusiness';
import { useServicesContext } from '../../context/ServicesContext';
import { useOpeningHoursContext } from '../../context/OpeningHoursContext';
import * as signalR from '@microsoft/signalr';
import {
  DashboardContainer,
  ErrorContainer,
  LoadingContainer,
  ErrorTypography,
  CustomCircularProgress,
  CustomContainer,
  CustomerListContainer,
  StyledCarouselContainer
} from '../../styles/CustomerStyle/CustomerDashboardStyle';
import BackAndNextButtons from './BackNextButtons';
import { fetchStaff } from '../../lib/apiClientStaff';
import ShopPicturesCarousel from './ShopPicturesCarousel';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const CustomerDashboard = () => {


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessName = queryParams.get('business_name');

  const [customer, setCustomer] = useState(null);
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
  const [, setRedirectingToOldCustomerForm] = useState(false);
  const { openingHours, fetchOpeningHoursForBusiness } = useOpeningHoursContext();

  const { services, categories, fetchServices, fetchCategories } = useServicesContext();
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const connectionRef = useRef(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessName) {
        setError('Business name not provided');
        setLoading(false);
        return;
      }
      try {
        const data = await fetchBusinessesByName(businessName);
        setBusinessInfo(data); // Store the whole business object
        await fetchServices(data.businessId); // Fetch services by business ID
        await fetchCategories(); // Fetch categories
        await fetchOpeningHoursForBusiness(data.businessId);
        setLoading(false);
      } catch (error) {
        setError('Error fetching business information');
        setLoading(false);
        console.error('Error fetching business:', error.message);
      }
    };

    fetchBusiness();
  }, [businessName, fetchServices, fetchCategories, fetchOpeningHoursForBusiness]);

  useEffect(() => {
    const connectToHub = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/appointmentHub`)
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        connectionRef.current = newConnection;

        // Listen for service updates
        newConnection.on('ReceiveServiceUpdate', async (message) => {
          if (businessInfo.businessId) {
            await fetchServices(businessInfo.businessId); // Refresh the services
          }
        });

        // Listen for staff updates
        newConnection.on('ReceiveStaffUpdate', async (message) => {
          if (businessInfo.businessId) {
            await fetchStaff(businessInfo.businessId); // Refresh the staff
          }
        });

      } catch (error) {
        console.error('Error connecting to SignalR hub:', error);
      }
    };

    connectToHub();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [businessInfo.businessId, fetchServices, fetchCategories]);

  const handleServiceSelect = (service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const handleServiceDeselect = (service) => {
    setSelectedServices(selectedServices.filter(s => s.serviceId !== service.serviceId));
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextFromServices = () => {
    if (selectedServices.length > 0) {
      setView('staffs');
    }
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
          setSelectedDate(null);
          setSelectedTime(null);
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
    } else if (view === 'staffs') {
      setView('calendar');
    } else if (view === 'calendar') {
      handleConfirmTime();
    }
  };

  const handleNewCustomerSuccess = () => {
    setRedirectingToOldCustomerForm(true);

    setTimeout(() => {
      setIsAddingNewCustomer(false);
      setView('customerForm');
      setRedirectingToOldCustomerForm(false);
    }, 5000);
  };

  const handleAppointmentSuccess = (customer) => {
    setCustomer(customer);
    setView('thankYou');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (query) {
      const matchingService = services.find(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingService) {
        setExpandedCategoryId(matchingService.categoryId);
      }
    } else {
      setExpandedCategoryId(null); // Collapse all if the search query is cleared
    }
  };

  if (!businessInfo.businessId) { // Check for businessId from the fetched data
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

  const columns = [[], [], []];
  categories.forEach((category, index) => {
    columns[index % 3].push(category);
  });

  // Function to delete the appointment by index
  const handleDeleteAppointment = (index) => {
    setSelectedAppointments(prevAppointments => prevAppointments.filter((_, i) => i !== index));
  };

  return (
    <>
      <Helmet>
        <title>{businessInfo.name ? `${businessInfo.name} - Termine buchen` : 'Kundendashboard'}</title>
        <meta name="description" content={`Buchen Sie Dienstleistungen und Termine bei ${businessInfo.name}. Sehen Sie sich verfügbares Personal, Dienstleistungen und Geschäftsinformationen an.`} />
      </Helmet>


      <DashboardContainer>
        <CustomerBusinessInfo businessInfo={businessInfo} />
        <StyledCarouselContainer>
          <ShopPicturesCarousel businessId={businessInfo.businessId} businessName={businessName} businessInfo={businessInfo}/>
        </StyledCarouselContainer>
        <CustomContainer>
          <BackAndNextButtons
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
            disableBack={view === 'services'}
            disableNext={
              (view === 'services' && selectedServices.length === 0) ||
              (view === 'staffs' && !selectedStaff) ||
              (view === 'calendar' && (!selectedDate || !selectedTime))
            }
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            view={view}
            isAddingNewCustomer={isAddingNewCustomer}
          />

          {view === 'services' && (
            <CustomerListContainer>
              {columns.map((column, colIndex) => (
                <div key={colIndex}>
                  {column.map(category => (
                    <ServiceList
                      key={category.categoryId}
                      category={category}
                      services={services.filter(service => service.categoryId === category.categoryId)}
                      businessId={businessInfo.businessId}
                      searchQuery={searchQuery}
                      selectedServices={selectedServices}
                      onServiceSelect={handleServiceSelect}
                      onServiceDeselect={handleServiceDeselect}
                      expandedCategoryId={expandedCategoryId}
                      setExpandedCategoryId={setExpandedCategoryId}
                    />
                  ))}
                </div>
              ))}
            </CustomerListContainer>
          )}

          {view === 'staffs' && (
            <CustomerListContainer>
              <StaffList
                businessId={businessInfo.businessId}
                searchQuery={searchQuery}
                selectedStaff={selectedStaff}
                onStaffSelect={handleStaffSelect}
              />
            </CustomerListContainer>
          )}

          {view === 'calendar' && (
            <MyDatePicker
              businessId={businessInfo.businessId}
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
              onConfirmTime={handleConfirmTime}
              staffId={selectedStaff?.staffId}
              totalDuration={totalDuration}
              openingHours={openingHours}
            />
          )}

          {view === 'overview' && (
            <AppointmentOverviewPage
              selectedAppointments={selectedAppointments}
              onAddMoreServices={() => setView('services')}
              onFinish={handleFinish}
              onDeleteAppointment={handleDeleteAppointment}
            />
          )}

          {view === 'customerForm' && (
            !isAddingNewCustomer ? (
              <OldCustomerForm
                selectedAppointments={selectedAppointments}
                businessId={businessInfo.businessId} // Use businessId from fetched data
                onAppointmentSuccess={handleAppointmentSuccess}
                onNewCustomer={() => setIsAddingNewCustomer(true)}
              />
            ) : (
              <NewCustomerForm
                businessId={businessInfo.businessId} // Use businessId from fetched data
                onCustomerAdded={handleNewCustomerSuccess}
              />
            )
          )}

          {view === 'thankYou' && <ThankYou customer={customer} />}
        </CustomContainer>
      </DashboardContainer>
    </>
  );
};

export default CustomerDashboard;