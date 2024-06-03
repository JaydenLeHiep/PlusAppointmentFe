import React, { useState, useEffect } from 'react';
import { Container, Card, Box, CircularProgress, Alert, Button, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BusinessList from './BusinessList';
import BusinessDetails from './BusinessDetails';
import Appointments from '../../components/Appointments'; // Import the Appointments component
import { fetchBusinesses } from '../../lib/apiClient';
import '../../styles/css/OwnerDashboard.css';

const OwnerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false); // State to manage visibility of appointments
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
    setShowAppointments(false); // Reset appointments visibility when a new business is selected
  };

  const handleBackToList = () => {
    setSelectedBusiness(null);
    setShowAppointments(false); // Hide appointments when going back to the list
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
                <BusinessDetails selectedBusiness={selectedBusiness} handleBackToList={handleBackToList} />
                <Box mt={2}>
                  {/* <Button variant="contained" color="primary" onClick={handleBackToList} style={{ marginRight: '8px' }}>
                    Back to List
                  </Button> */}
                  <Button variant="contained" color="secondary" onClick={toggleShowAppointments}>
                    {showAppointments ? 'Hide Appointments' : 'Show Appointments'}
                  </Button>
                </Box>
                {showAppointments && (
                  <Box mt={2}>
                    <Typography variant="h5" gutterBottom>
                      {selectedBusiness.businessName}
                    </Typography>
                    <Appointments businessId={selectedBusiness.businessId} />
                  </Box>
                )}
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