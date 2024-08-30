import React from 'react';
import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ThankYou = () => {
  const { t } = useTranslation('thankYouPage');

  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography variant="h3" gutterBottom>
        {t('thankYouTitle')}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t('thankYouMessage')}
      </Typography>
    </Container>
  );
};

export default ThankYou;
