import React from 'react';
import { Box, Container, Card, Typography } from '@mui/material';
import LoginForm from './LoginForm';
const heroImage = require('../../../assets/hero-image.jpg');

const LoginHero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        minHeight: '82vh',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '82vh',
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            mt: 0,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: '#333',
            }}
          >
            Login
          </Typography>
          <LoginForm />
        </Card>
      </Container>
    </Box>
  );
};

export default LoginHero;