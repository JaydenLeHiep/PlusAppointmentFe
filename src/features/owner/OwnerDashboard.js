import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, Box, CircularProgress, Alert, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/css/OwnerDashboard.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const OwnerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/api/business`;

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [apiUrl]);

  const handleBusinessClick = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Business not found');
      }

      const data = await response.json();
      setSelectedBusiness(data);
      // Convert appointments to events for the calendar
      setEvents(data.appointments.map(appointment => ({
        title: `Appointment with ${appointment.customerName}`,
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime),
      })));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
              <>
                <Typography variant="h4" component="h1" gutterBottom className="text-center">
                  Owner Dashboard
                </Typography>
                {selectedBusiness ? (
                  <Box>
                    <Typography variant="h5" gutterBottom className="text-center">
                      {selectedBusiness.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Address:</strong> {selectedBusiness.address}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Phone:</strong> {selectedBusiness.phone}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Email:</strong> {selectedBusiness.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Staffs:</strong> {selectedBusiness.staffs.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Appointments:</strong> {selectedBusiness.appointments.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Services:</strong> {selectedBusiness.services.length}
                    </Typography>
                    <Box className="calendar-container">
                      <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500, margin: "50px" }}
                      />
                    </Box>
                    <Button variant="contained" color="primary" onClick={() => setSelectedBusiness(null)}>
                      Back to list
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h5" gutterBottom className="text-center">
                      My Businesses
                    </Typography>
                    {businesses.map((business) => (
                      <Card key={business.businessId} className="business-card" onClick={() => handleBusinessClick(business.businessId)}>
                        <Typography variant="h6">{business.name}</Typography>
                        <Typography variant="body2">{business.address}</Typography>
                      </Card>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OwnerDashboard;
