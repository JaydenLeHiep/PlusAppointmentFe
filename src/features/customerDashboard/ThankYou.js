import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ThankYou = ({ customer }) => {
  const { t } = useTranslation('thankYouPage');
  const [customerName, setCustomerName] = useState('');
console.log(customer)
  useEffect(() => {
    const getCustomerDetails = async () => {
      if (customer) {
        try {
          setCustomerName(customer.name);
        } catch (error) {
          console.error('Failed to fetch customer details:', error);
        }
      }
    };
    getCustomerDetails();
  }, [customer]);

  return (
    <Container sx={{ textAlign: 'center', paddingTop: '50px', paddingBottom: '50px' }}>
      <Typography variant="h3" gutterBottom>
        {t('thankYouTitle')} <span style={{ fontSize: '1.2em',  fontFamily: "'Dancing Script', cursive", marginLeft: '8px'}}>{customerName} !</span>
      </Typography>
      <Typography variant="h6" gutterBottom>
        {customerName ? `${t('thankYouMessage')} ${customerName}!` : t('thankYouMessage')}
      </Typography>
    </Container>
  );
};

export default ThankYou;