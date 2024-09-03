import React from 'react';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroButton,
  ServicesContainer,
  ServiceGrid,
  ServiceItem,
  ServiceTitle,
  ServiceDescription,
} from '../../styles/HomeStyle/BusinessHomePageStyles';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BusinessHomePage = () => {
  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <Box>
          <HeroTitle>
            Welcome to Nail Store
          </HeroTitle>
          <HeroSubtitle>
            Experience the best nail care services with us.
          </HeroSubtitle>
          <HeroButton
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/register"
          >
            Get Started
          </HeroButton>
        </Box>
      </HeroSection>
      <ServicesContainer>
        <HeroTitle>
          Our Services
        </HeroTitle>
        <ServiceGrid container spacing={4}>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              Manicure
            </ServiceTitle>
            <ServiceDescription>
              Professional manicure services to keep your hands looking their best.
            </ServiceDescription>
          </ServiceItem>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              Pedicure
            </ServiceTitle>
            <ServiceDescription>
              Enjoy our relaxing pedicure services for beautiful feet.
            </ServiceDescription>
          </ServiceItem>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              Nail Art
            </ServiceTitle>
            <ServiceDescription>
              Creative and stunning nail art designs for any occasion.
            </ServiceDescription>
          </ServiceItem>
        </ServiceGrid>
      </ServicesContainer>
      <Footer />
    </PageContainer>
  );
};

export default BusinessHomePage;