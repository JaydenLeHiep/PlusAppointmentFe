import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Box, CircularProgress, Alert } from '@mui/material';
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

import * as signalR from '@microsoft/signalr';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const OwnerDashboard = () => {
  const { appointments, fetchAppointmentsForBusiness } = useAppointmentsContext();
  const { staff, fetchAllStaff } = useStaffsContext();
  const { services, fetchServices } = useServicesContext();
  const {customers, fetchCustomersForBusiness } = useCustomersContext();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const connectionRef = useRef(null); // Use a ref for SignalR connection

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
        await fetchAppointmentsForBusiness(selectedBusiness.businessId);
        await fetchAllStaff(selectedBusiness.businessId);
        await fetchServices(selectedBusiness.businessId);
        await fetchCustomersForBusiness(selectedBusiness.businessId); 
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
  }, [selectedBusiness, fetchAppointmentsForBusiness, fetchAllStaff, fetchServices, fetchCustomersForBusiness]);

  // Setup SignalR connection
  useEffect(() => {
    const connectToHub = async () => {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/appointmentHub`)
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        console.log('Connected to SignalR hub');
        connectionRef.current = newConnection;

        newConnection.on('ReceiveAppointmentUpdate', async (message) => {
          console.log('New appointment update:', message);
          if (selectedBusiness && selectedBusiness.businessId) {
            await fetchAppointmentsForBusiness(selectedBusiness.businessId); // Refresh the appointments
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
  }, [selectedBusiness, fetchAppointmentsForBusiness]);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#f0f8ff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: '0 1rem', md: '0 2rem' },
          flex: 1,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '82vh',
            paddingTop: 0,
            marginTop: 0,
          }}
        >
          <Card
            sx={{
              width: '100%',
              maxWidth: '100%',
              padding: { xs: '1rem', md: '2rem' },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              marginTop: { xs: '10px', md: '30px' },
              marginBottom: { xs: '10px', md: '30px' },
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
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
                  customers= {customers}
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
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OwnerDashboard;