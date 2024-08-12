import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const heroImage = require('../../assets/hero-image.jpg');

const BusinessHomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Box sx={{ padding: '2rem' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Nail Store
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Experience the best nail care services with us.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/register"
            sx={{ mt: 2, padding: '10px 20px', fontSize: '1rem' }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      <Container sx={{ padding: '4rem 0', flex: '1', backgroundColor: '#fdf2f4' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Manicure
            </Typography>
            <Typography variant="body1">
              Professional manicure services to keep your hands looking their best.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Pedicure
            </Typography>
            <Typography variant="body1">
              Enjoy our relaxing pedicure services for beautiful feet.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Nail Art
            </Typography>
            <Typography variant="body1">
              Creative and stunning nail art designs for any occasion.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default BusinessHomePage;