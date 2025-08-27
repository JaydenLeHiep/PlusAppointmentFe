import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, IconButton } from '@mui/material';
import EnglishFlag from '../../assets/united-kingdom.png';
import VietnameseFlag from '../../assets/vietnam.png';
import GermanFlag from '../../assets/germany.png'
import {
  PageContainer,
  StyledPaper,
  TitleTypography,
  SubtitleTypography,
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from '../../styles/HomeStyle/HomePageStyles';

const HomePage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('homePage');

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <PageContainer>
      {/* Language Flags */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem 0',
        }}
      >
        <IconButton onClick={() => changeLanguage('en')} aria-label="Change language to English">
          <img src={EnglishFlag} alt="English" style={{ width: '70px', height: 'auto' }} />
        </IconButton>
        <IconButton onClick={() => changeLanguage('vi')} aria-label="Change language to Vietnamese">
          <img src={VietnameseFlag} alt="Vietnamese" style={{ width: '70px', height: 'auto' }} />
        </IconButton>
        <IconButton onClick={() => changeLanguage('ge')} aria-label="Change language to German">
          <img src={GermanFlag} alt="German" style={{ width: '70px', height: 'auto' }} />
        </IconButton>
      </Box>

      {/* Main Content */}
      <StyledPaper>
        <TitleTypography variant="h3" gutterBottom>
          {t('welcomeMessage')}
        </TitleTypography>
        <SubtitleTypography variant="h5" gutterBottom>
          {t('areYou')}
        </SubtitleTypography>
        <ButtonContainer>
          <PrimaryButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/business-home')}
          >
            {t('businessOwner')}
          </PrimaryButton>
          <PrimaryButton
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/staff-login')}
          >
            Staff
          </PrimaryButton>
          <SecondaryButton
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/customer-dashboard')}
          >
            {t('customer')}
          </SecondaryButton>
        </ButtonContainer>
      </StyledPaper>
    </PageContainer>
  );
};

export default HomePage;
