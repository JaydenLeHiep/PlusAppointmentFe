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
import { fetchBusinessesByName } from '../../lib/apiClientBusiness';
import { useServicesContext } from '../../context/ServicesContext';
import {
  DashboardContainer,
  ErrorContainer,
  LoadingContainer,
  ErrorTypography,
  CustomCircularProgress,
  CustomContainer,
  CustomerListContainer,
} from '../../styles/CustomerStyle/CustomerDashboardStyle';
import BackAndNextButtons from './BackNextButtons';

const CustomerDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessName = queryParams.get('business_name');

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

  const { services, categories, fetchServices, fetchCategories } = useServicesContext();

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
        setLoading(false);
      } catch (error) {
        setError('Error fetching business information');
        setLoading(false);
        console.error('Error fetching business:', error.message);
      }
    };

    fetchBusiness();
  }, [businessName, fetchServices, fetchCategories]);

  const handleServiceSelect = (service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const handleServiceDeselect = (service) => {
    setSelectedServices(selectedServices.filter(s => s.serviceId !== service.serviceId));
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);  // Only allow one staff to be selected
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

  const handleAppointmentSuccess = () => {
    setView('thankYou');
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
  console.log('Current Category:', category); // Log the current category object
  console.log('Current Index:', index); // Log the current index
  
  // Distribute categories across the columns based on the index modulo the number of columns
  columns[index % 3].push(category);
  
  console.log('Columns after push:', columns); // Log the state of columns after each push
});

console.log('Final Columns Distribution:', columns); // Log the final distribution of categories across columns

  return (
    <DashboardContainer>
      <CustomerBusinessInfo businessInfo={businessInfo} />

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
          onSearchChange={setSearchQuery}
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
                   />
                 ))}
               </div>
             ))}
           </CustomerListContainer>
        )}

        {view === 'staffs' && (
          <CustomerListContainer>
            <StaffList
              businessId={businessInfo.businessId} // Use businessId from fetched data
              searchQuery={searchQuery}
              selectedStaff={selectedStaff} // Pass the selectedStaff state
              onStaffSelect={handleStaffSelect} // Use handleStaffSelect for selection
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
  
          {view === 'thankYou' && <ThankYou />}
        </CustomContainer>
      </DashboardContainer>
    );
  };
  
  export default CustomerDashboard;