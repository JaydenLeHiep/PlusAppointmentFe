import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import AppointmentList from '../ownerDashboard/appointment/AppointmentList';
import { fetchBusinesses } from '../../lib/apiClientBusiness';
import { useAppointmentsContext } from '../../context/AppointmentsContext';
import { useStaffsContext } from '../../context/StaffsContext';
import { useServicesContext } from '../../context/ServicesContext';
import { useCustomersContext } from '../../context/CustomerContext';
import { useNotAvailableDateContext } from '../../context/NotAvailableDateContext';
import * as signalR from '@microsoft/signalr';
import {
  RootContainer,
  MainContainer,
  ContentContainer,
  StyledCard,
  LoadingContainer,
} from '../../styles/OwnerStyle/OwnerDashboardStyles';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const OwnerDashboard = () => {
  const { appointments, fetchAppointmentsForBusiness, setAppointments } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { customers, fetchCustomersForBusiness } = useCustomersContext();
  const { services, fetchServices, fetchCategories } = useServicesContext();
  const { notAvailableDates, fetchAllNotAvailableDatesByBusiness } = useNotAvailableDateContext();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const connectionRef = useRef(null);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const businessList = await fetchBusinesses();
        setBusinesses(businessList);
      } catch (error) {
        setError(error.message);
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
          ]);
        } catch (error) {
          setError(error.message);
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
        // Listen for appointment addition
        newConnection.on('ReceiveAppointmentUpdate', async (message) => {
          console.log('New appointment id received via SignalR:', message);
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAppointmentsForBusiness(selectedBusiness.businessId); // Refresh the appointments
          }
        });

        // Listen for appointment deletion
        newConnection.on('ReceiveAppointmentDeleted', (appointmentId) => {
          console.log('New appointment id received via SignalR:', appointmentId);
          setAppointments(prevAppointments =>
            prevAppointments.filter(appt => appt.appointmentId !== appointmentId)  // Remove deleted appointment
          );
        });

        // Listen for appointment status change
        newConnection.on('ReceiveAppointmentStatusChanged', (appointmentUpdate) => {
          console.log('New appointment id changed received via SignalR:', appointmentUpdate);
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
    fetchAppointmentsForBusiness,
    fetchAllStaff,
    fetchServices,
    fetchCustomersForBusiness,
    fetchAllNotAvailableDatesByBusiness,
    setAppointments
  ]);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  return (
    <RootContainer>
      <Navbar />
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
                <BusinessDetails
                  selectedBusiness={selectedBusiness}
                  setSelectedBusiness={setSelectedBusiness}
                  staff={staff}
                  services={services}
                  appointments={appointments}
                  customers={customers}
                  notAvailableDates={notAvailableDates}
                />
                <AppointmentList
                  appointments={appointments}
                  staff={staff}
                  services={services}
                  businessId={selectedBusiness.businessId}
                  
                />
              </>
            ) : (
              <BusinessList businesses={businesses} onBusinessClick={handleBusinessClick} />
            )}
          </StyledCard>
        </ContentContainer>
      </MainContainer>
      <Footer />
    </RootContainer>
  );
};

export default OwnerDashboard;