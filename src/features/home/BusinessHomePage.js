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
import { useTranslation } from 'react-i18next';

const BusinessHomePage = () => {
  const { t } = useTranslation('businessHomePage');

  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <Box>
          <HeroTitle>
            {t('heroTitle')}
          </HeroTitle>
          <HeroSubtitle>
            {t('heroSubtitle')}
          </HeroSubtitle>
          <HeroButton
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/register"
          >
            {t('getStartedButton')}
          </HeroButton>
        </Box>
      </HeroSection>
      <ServicesContainer>
        <HeroTitle>
          {t('servicesTitle')}
        </HeroTitle>
        <ServiceGrid container spacing={4}>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              {t('services.appointment.title')}
            </ServiceTitle>
            <ServiceDescription>
              {t('services.appointment.description')}
            </ServiceDescription>
          </ServiceItem>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              {t('services.support.title')}
            </ServiceTitle>
            <ServiceDescription>
              {t('services.support.description')}
            </ServiceDescription>
          </ServiceItem>
          <ServiceItem item xs={12} md={4}>
            <ServiceTitle>
              {t('services.dataOwnership.title')}
            </ServiceTitle>
            <ServiceDescription>
              {t('services.dataOwnership.description')}
            </ServiceDescription>
          </ServiceItem>
        </ServiceGrid>
      </ServicesContainer>

      <Footer />
    </PageContainer>
  );
};

export default BusinessHomePage;
