import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('homePage');

  return (
    <PageContainer>
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