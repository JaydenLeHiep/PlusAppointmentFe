import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/css/OwnerCss/BusinessHomePage.css';

const BusinessHomePage = () => {
  return (
    <Box>
      <Navbar />
      <Box className="hero">
        <Box className="hero-content">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Nail Store
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Experience the best nail care services with us.
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/register">
            Get Started
          </Button>
        </Box>
      </Box>
      <Container className="section">
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