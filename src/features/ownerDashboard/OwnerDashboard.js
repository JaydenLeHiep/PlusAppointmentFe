import React, { useState, useEffect } from 'react';
import { Container, Card, Box, CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import { fetchBusinesses } from '../../lib/apiClient';
import '../../styles/css/OwnerDashboard.css';

const OwnerDashboard = () => {
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
  }, []);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  const handleBackToList = () => {
    setSelectedBusiness(null);
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
              <BusinessDetails selectedBusiness={selectedBusiness} handleBackToList={handleBackToList} />
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
