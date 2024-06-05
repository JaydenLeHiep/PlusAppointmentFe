import React, { useState, useEffect } from 'react';
import { Container, Card, Box, CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import AppointmentsButton from './AppointmentsButton';
import { fetchBusinesses } from '../../lib/apiClient';
import '../../styles/css/OwnerDashboard.css';

const OwnerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false); 
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
      // Clear the flag and reset state for a new login
      localStorage.removeItem('isNewLogin');
      setSelectedBusiness(null);
      setShowAppointments(false);
    } else {
      // Retrieve selected business and showAppointments from local storage if they exist
      const storedBusiness = localStorage.getItem('selectedBusiness');
      if (storedBusiness) {
        setSelectedBusiness(JSON.parse(storedBusiness));
      }

      const storedShowAppointments = localStorage.getItem('showAppointments');
      if (storedShowAppointments) {
        setShowAppointments(JSON.parse(storedShowAppointments));
      }
    }
  }, []);

  useEffect(() => {
    if (selectedBusiness) {
      localStorage.setItem('selectedBusiness', JSON.stringify(selectedBusiness));
    } else {
      localStorage.removeItem('selectedBusiness');
    }

    localStorage.setItem('showAppointments', JSON.stringify(showAppointments));
  }, [selectedBusiness, showAppointments]);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
    setShowAppointments(false);
  };

  const toggleShowAppointments = () => {
    setShowAppointments((prevShowAppointments) => !prevShowAppointments);
  };

  return (
    <Box>
      <Navbar />
      <Box className="dashboard-hero">
        <Container className="d-flex align-items-center justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '82vh', paddingTop: 0, marginTop: 0 }}>
          <Card className="dashboard-container">
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : selectedBusiness ? (
              <>
                <BusinessDetails selectedBusiness={selectedBusiness} setSelectedBusiness={setSelectedBusiness} />
                <AppointmentsButton showAppointments={showAppointments} toggleShowAppointments={toggleShowAppointments} selectedBusiness={selectedBusiness} />
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
