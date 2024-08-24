import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EnglishFlag from '../assets/united-kingdom.png';
import VietnameseFlag from '../assets/vietnam.png';

const Footer = () => {
  const { i18n, t } = useTranslation('footer');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        padding: '2.8rem 0',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        fontSize: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* Language Switcher */}
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={() => changeLanguage('en')} aria-label="Change language to English">
          <img src={EnglishFlag} alt="English" style={{ width: '32px', height: 'auto' }} />
        </IconButton>
        <IconButton onClick={() => changeLanguage('vi')} aria-label="Change language to Vietnamese">
          <img src={VietnameseFlag} alt="Vietnamese" style={{ width: '32px', height: 'auto' }} />
        </IconButton>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: '#000',
          textDecoration: 'none',
        }}
      >
        {t('copyright', { year: new Date().getFullYear() })}
      </Typography>
    </Box>
  );
};

export default Footer;
