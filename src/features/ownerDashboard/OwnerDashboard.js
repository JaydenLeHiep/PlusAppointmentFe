import React, { useState } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import useFetchBusinesses from '../../hooks/useFetchBusiness';
import '../../styles/css/OwnerDashboard.css';
import Card from '@mui/material/Card';

const OwnerDashboard = () => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { businesses, loading, error } = useFetchBusinesses();

  const handleBusinessClick = (id) => {
    setSelectedBusiness(businesses.find(business => business.businessId === id));
  };

  const handleBackToList = () => {
    setSelectedBusiness(null);
  };

  return (
    <Box>
      <Navbar />
      <Box className="dashboard-hero">
      <Container className="d-flex align-items-center justify-content-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "82vh", paddingTop: 0, marginTop: 0 }}>
          <Card className="dashboard-container">
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              selectedBusiness ? (
                <BusinessDetails
                  selectedBusiness={selectedBusiness}
                  handleBackToList={handleBackToList}
                />
              ) : (
                <BusinessList businesses={businesses} handleBusinessClick={handleBusinessClick} />
              )
            )}
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OwnerDashboard;
