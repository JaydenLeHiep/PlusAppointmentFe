import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Alert, Snackbar } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslation } from 'react-i18next';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import AppointmentList from '../ownerDashboard/appointment/AppointmentList';
import { fetchBusinesses } from '../../lib/apiClientBusiness';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import { useStaffsContext } from '../../context/StaffsContext';
import { useServicesContext } from '../../context/ServicesContext';
import { useCustomersContext } from '../../context/CustomerContext';
import { useNotAvailableDateContext } from '../../context/NotAvailableDateContext';
import { useNotAvailableTimeContext } from '../../context/NotAvailableTimeContext';
import CustomerInfo from '../customerInfo/CustomerInfo';
import * as signalR from '@microsoft/signalr';
import {
  RootContainer,
  MainContainer,
  ContentContainer,
  StyledCard,
  LoadingContainer,
} from '../../styles/OwnerStyle/OwnerDashboardStyles';
import { useNotificationsContext } from '../../context/NotificationsContext';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const OwnerDashboard = () => {
  const { appointments, fetchAppointmentsForBusiness, setAppointments, fetchAppointmentById } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { customers, fetchCustomersForBusiness } = useCustomersContext();
  const { services, categories, fetchServices, fetchCategories } = useServicesContext();
  const { notAvailableDates, fetchAllNotAvailableDatesByBusiness } = useNotAvailableDateContext();
  const { notifications, fetchAllNotifications } = useNotificationsContext();
  const { notAvailableTimes, fetchAllNotAvailableTimesByBusiness } = useNotAvailableTimeContext();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const connectionRef = useRef(null);
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { t } = useTranslation('ownerDashboard');

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const businessList = await fetchBusinesses();
        setBusinesses(businessList);

      } catch (error) {
        setError(error.message);
        console.error('Error loading businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();

    const isNewLogin = localStorage.getItem('isNewLogin');
    if (isNewLogin) {
      localStorage.removeItem('isNewLogin');
      setSelectedBusiness(null);
    } else {
      const storedBusiness = localStorage.getItem('selectedBusiness');
      if (storedBusiness) {
        setSelectedBusiness(JSON.parse(storedBusiness));
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (selectedBusiness && selectedBusiness.businessId) {
        setLoading(true);  // Set loading to true before fetching data
        try {
          await Promise.all([
            fetchAppointmentsForBusiness(selectedBusiness.businessId),
            fetchAllStaff(selectedBusiness.businessId),
            fetchServices(selectedBusiness.businessId),
            fetchCategories(),
            fetchCustomersForBusiness(selectedBusiness.businessId),
            fetchAllNotAvailableDatesByBusiness(selectedBusiness.businessId),
            fetchAllNotAvailableTimesByBusiness(selectedBusiness.businessId),
            fetchAllNotifications(selectedBusiness.businessId)
          ]);

        } catch (error) {
          setError(error.message);
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);  // Set loading to false after fetching data
        }
      }
    };

    if (selectedBusiness) {

      localStorage.setItem('selectedBusiness', JSON.stringify(selectedBusiness));
      localStorage.setItem('selectedBusinessId', selectedBusiness.businessId);
      fetchAllData();
    } else {
      localStorage.removeItem('selectedBusiness');
      localStorage.removeItem('selectedBusinessId');
    }
  }, [
    selectedBusiness,
    fetchAppointmentsForBusiness,
    fetchAllStaff,
    fetchServices,
    fetchCategories,
    fetchCustomersForBusiness,
    fetchAllNotAvailableDatesByBusiness,
    fetchAllNotAvailableTimesByBusiness,
    fetchAllNotifications,
  ]);



  // Setup SignalR connection
  useEffect(() => {
    const connectToHub = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/appointmentHub`)
        .withAutomaticReconnect()
        .build();
      try {
        await newConnection.start();
        connectionRef.current = newConnection;
        // Listen for appointment updates
        newConnection.on('ReceiveAppointmentUpdate', (data) => {
          const { appointment } = data;
          // Convert the services array to match the existing format
          const normalizedAppointment = {
            ...appointment,
            services: {
              $values: appointment.services || [] // Ensure services is wrapped in $values
            }
          };
          if (selectedBusiness && selectedBusiness.businessId) {
            setAppointments((prevAppointments) => {
              const appointmentExists = prevAppointments.some((appt) => appt.appointmentId === normalizedAppointment.appointmentId);
              if (appointmentExists) {
                return prevAppointments;
              }
              return [...prevAppointments, normalizedAppointment];
            });
          }
        });

        // Listen for notification updates
        newConnection.on('ReceiveNotificationUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAllNotifications(selectedBusiness.businessId) // Refresh the appointments
            setNewNotificationMessage(t('notifications.newNotification')); // Set the message for the snackbar
            setSnackbarOpen(true);
          }
        });

        // Listen for appointment deletion
        newConnection.on('ReceiveAppointmentDeleted', (appointmentId) => {
          console.log('Appointment deleted via SignalR:', appointmentId);
          setAppointments(prevAppointments =>
            prevAppointments.filter(appt => appt.appointmentId !== appointmentId)  // Remove deleted appointment
          );
        });

        // Listen for appointment status change
        newConnection.on('ReceiveAppointmentStatusChanged', (appointmentUpdate) => {
          console.log('Appointment status changed via SignalR:', appointmentUpdate);
          setAppointments(prevAppointments =>
            prevAppointments.map(appt =>
              appt.appointmentId === appointmentUpdate.appointmentId
                ? { ...appt, status: appointmentUpdate.status }  // Update the status of the appointment
                : appt
            )
          );
        });

        // Listen for service updates
        newConnection.on('ReceiveServiceUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchServices(selectedBusiness.businessId); // Refresh the services
          }
        });

        // Listen for staff updates
        newConnection.on('ReceiveStaffUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAllStaff(selectedBusiness.businessId); // Refresh the staff
          }
        });

        // Listen for customer updates
        newConnection.on('ReceiveCustomerUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchCustomersForBusiness(selectedBusiness.businessId); // Refresh the customers
          }
        });

        // Listen for not available date updates
        newConnection.on('ReceiveNotAvailableDateUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAllNotAvailableDatesByBusiness(selectedBusiness.businessId); // Refresh not available dates
          }
        });

        // Listen for not available time updates
        newConnection.on('ReceiveNotAvailableTimeUpdate', async (message) => {
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAllNotAvailableTimesByBusiness(selectedBusiness.businessId); // Refresh not available times
          }
        });

        // Listen for appointment deletion in customer
        newConnection.on('ReceiveAppointmentForCustomerDeleted', (appointmentId) => {
          console.log('Appointment deleted via SignalR:', appointmentId);
          setAppointments(prevAppointments =>
            prevAppointments.filter(appt => appt.appointmentId !== appointmentId)  // Remove deleted appointment
          );
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
  }, [
    selectedBusiness,
    appointments,
    fetchAppointmentsForBusiness,
    fetchAllStaff,
    fetchServices,
    fetchCustomersForBusiness,
    fetchAllNotAvailableDatesByBusiness,
    fetchAllNotAvailableTimesByBusiness,
    setAppointments,
    fetchAllNotifications,
    t
  ]);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Change active view function
  const changeView = (view) => {
    setActiveView(view);
  };

  return (
    <RootContainer>
      <Navbar changeView={changeView} />
      <MainContainer>
        <ContentContainer>
          <StyledCard>
            {loading ? (
              <LoadingContainer>
                <CircularProgress />
              </LoadingContainer>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : selectedBusiness ? (
              <>
                {activeView === 'dashboard' && (
                  <>
                    <BusinessDetails
                      selectedBusiness={selectedBusiness}
                      setSelectedBusiness={setSelectedBusiness}
                      staff={staff}
                      services={services}
                      categories={categories}
                      appointments={appointments}
                      customers={customers}
                      notAvailableDates={notAvailableDates}
                      notAvailableTimes={notAvailableTimes}
                      notifications={notifications}
                    />

                    <AppointmentList
                      appointments={appointments}
                      staff={staff}
                      services={services}
                      businessId={selectedBusiness.businessId}
                      fetchAppointmentById={fetchAppointmentById}
                    />
                  </>
                )}

                {activeView === 'customersInfo' && (
                  <>
                    <CustomerInfo
                      customers={customers || []}
                      businessId={selectedBusiness?.businessId}
                    />
                  </>
                )}
              </>
            ) : (
              <BusinessList businesses={businesses} onBusinessClick={handleBusinessClick} />
            )}
          </StyledCard>
        </ContentContainer>
      </MainContainer>
      <Footer />
      {/* Snackbar for notification */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={newNotificationMessage}
        autoHideDuration={10000}
      />
    </RootContainer>
  );
};

export default OwnerDashboard;
