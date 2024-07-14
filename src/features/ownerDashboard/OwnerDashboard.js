// OwnerDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Box, CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import AppointmentList from '../appointment/AppointmentList';
import { fetchBusinesses } from '../../lib/apiClientBusiness';
import { useAppointmentsContext } from '../appointment/AppointmentsContext';
import '../../styles/css/OwnerDashboard.css';

const OwnerDashboard = () => {
  const { appointments, fetchAppointmentsForBusiness } = useAppointmentsContext();
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    if (selectedBusiness) {
      localStorage.setItem('selectedBusiness', JSON.stringify(selectedBusiness));
      localStorage.setItem('selectedBusinessId', selectedBusiness.businessId);
      fetchAppointmentsForBusiness(selectedBusiness.businessId);
    } else {
      localStorage.removeItem('selectedBusiness');
      localStorage.removeItem('selectedBusinessId');
     //setAppointments([]);
    }
  }, [selectedBusiness, fetchAppointmentsForBusiness]);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Box className="dashboard-hero">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '82vh', paddingTop: 0, marginTop: 0 }}
        >
          <Card className="dashboard-container">
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : selectedBusiness ? (
              <>
                <BusinessDetails 
                  selectedBusiness={selectedBusiness} 
                  setSelectedBusiness={setSelectedBusiness} 
                  appointments={appointments} 
                />
                <AppointmentList 
                  appointments={appointments} 
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
