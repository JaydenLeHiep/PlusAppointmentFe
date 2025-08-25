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
import { useOpeningHoursContext } from '../../context/OpeningHoursContext';
import { useWorkSessionsContext } from '../../context/WorkSessionsContext';
import { useCalculateMoneyContext } from '../../context/CalculateMoneyContext';
import CalculateMoneyView from '../CalculateMoney/CalculateMoneyView';
import CustomerInfo from '../customerInfo/CustomerInfo';
import { AnimatePresence, motion } from 'framer-motion';
import * as signalR from '@microsoft/signalr';
import {
  RootContainer,
  MainContainer,
  ContentContainer,
  StyledCard,
  LoadingContainer,
  CarouselIndicatorContainer,
  CarouselDot
} from '../../styles/OwnerStyle/OwnerDashboardStyles';
import { useNotificationsContext } from '../../context/NotificationsContext';
import HeartAnimation from '../../styles/OwnerStyle/HeartAnimation';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const OwnerDashboard = () => {
  const { appointments, fetchAppointmentsForBusiness, setAppointments, fetchAppointmentById } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { customers, fetchCustomersForBusiness } = useCustomersContext();
  const { services, categories, fetchServices, fetchCategories } = useServicesContext();
  const { notAvailableDates, fetchAllNotAvailableDatesByBusiness } = useNotAvailableDateContext();
  const { notifications, fetchAllNotifications } = useNotificationsContext();
  const { notAvailableTimes, fetchAllNotAvailableTimesByBusiness } = useNotAvailableTimeContext();
  const { openingHours, fetchOpeningHoursForBusiness } = useOpeningHoursContext();
  const { workSessions, fetchWorkSessionsByBusinessData } = useWorkSessionsContext();
  const {
    businessEarnings,
    getBusinessYearlyEarnings,
    getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings,
    getBusinessDailyEarnings
  } = useCalculateMoneyContext();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('dashboard');
  const connectionRef = useRef(null);
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { t } = useTranslation('ownerDashboard');

  function getISOWeek(date) {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const diff = target - firstThursday;
    return 1 + Math.round((diff / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
  }

  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

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
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!selectedBusiness?.businessId) return;
      setLoading(true);
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentWeek = getISOWeek(now);
        await Promise.all([
          fetchAppointmentsForBusiness(selectedBusiness.businessId),
          fetchAllStaff(selectedBusiness.businessId),
          fetchServices(selectedBusiness.businessId),
          fetchCategories(),
          fetchCustomersForBusiness(selectedBusiness.businessId),
          fetchAllNotAvailableDatesByBusiness(selectedBusiness.businessId),
          fetchAllNotAvailableTimesByBusiness(selectedBusiness.businessId),
          fetchAllNotifications(selectedBusiness.businessId),
          fetchOpeningHoursForBusiness(selectedBusiness.businessId),
          fetchWorkSessionsByBusinessData(selectedBusiness.businessId),
          getBusinessWeeklyEarnings(selectedBusiness.businessId, currentYear, currentWeek)
        ]);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
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
    fetchOpeningHoursForBusiness,
    fetchWorkSessionsByBusinessData,
    getBusinessWeeklyEarnings
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

      // Work session update
      ['ReceiveWorkSessionCreated', 'ReceiveWorkSessionUpdated', 'ReceiveWorkSessionDeleted'].forEach(event => {
        newConnection.on(event, async () => {
          if (selectedBusiness?.businessId) {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const week = getISOWeek(now);
            const day = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD

            await fetchWorkSessionsByBusinessData(selectedBusiness.businessId);

            if (activeView === 'calculateMoney') {
              await Promise.all([
                getBusinessYearlyEarnings(selectedBusiness.businessId, year),
                getBusinessMonthlyEarnings(selectedBusiness.businessId, year, month),
                getBusinessWeeklyEarnings(selectedBusiness.businessId, year, week),
                getBusinessDailyEarnings(selectedBusiness.businessId, day),
              ]);
            }
          }
        });
      });
    };

    connectToHub();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
      }
    };
  }, [
    selectedBusiness,
    activeView,
    appointments,
    fetchAppointmentsForBusiness,
    fetchAllStaff,
    fetchServices,
    fetchCustomersForBusiness,
    fetchAllNotAvailableDatesByBusiness,
    fetchAllNotAvailableTimesByBusiness,
    setAppointments,
    fetchAllNotifications,
    fetchWorkSessionsByBusinessData,
    getBusinessYearlyEarnings,
    getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings,
    getBusinessDailyEarnings,
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

    const handleBackToBusinessList = () => {
    setSelectedBusiness(null);
  };

  return (
    <RootContainer>
      <Navbar changeView={changeView} selectedBusiness={selectedBusiness} />
      {selectedBusiness && (
        <CarouselIndicatorContainer>
          {['dashboard', 'calculateMoney', 'customersInfo'].map((view) => (
            <CarouselDot
              key={view}
              onClick={() => changeView(view)}
              active={activeView === view}
            />
          ))}
        </CarouselIndicatorContainer>
      )}
      <MainContainer>
      <HeartAnimation />
        <ContentContainer>
          <StyledCard>
            {loading ? (
              <LoadingContainer>
                <CircularProgress />
              </LoadingContainer>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : selectedBusiness ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  style={{ width: '100%', height: '100%' }}
                >
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
                        fetchAppointmentById={fetchAppointmentById}
                        openingHours={openingHours}
                        onBack={handleBackToBusinessList} 
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
                  {activeView === 'calculateMoney' && (
                    <CalculateMoneyView
                      businessId={selectedBusiness.businessId}
                      workSessions={workSessions}
                      earningsSummary={businessEarnings}
                      staff={staff}
                    />
                  )}
                  {activeView === 'customersInfo' && (
                    <CustomerInfo
                      customers={customers || []}
                      businessId={selectedBusiness?.businessId}
                      businessName={selectedBusiness?.name}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <BusinessList businesses={businesses} onBusinessClick={handleBusinessClick} />
            )}
          </StyledCard>
        </ContentContainer>
      </MainContainer>
      <Footer />
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