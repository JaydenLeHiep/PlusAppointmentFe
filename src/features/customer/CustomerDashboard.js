import React from 'react';
import { Container, Typography } from '@mui/material';

const CustomerDashboard = () => (
  <Container>
    <Typography variant="h4" component="h1" gutterBottom>
      Customer Dashboard
    </Typography>
    <Typography variant="body1">
      Welcome, Customer!
    </Typography>
  </Container>
);

export default CustomerDashboard;
