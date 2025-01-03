import React from 'react';
import { Box, IconButton } from '@mui/material';

import EnglishFlag from '../assets/united-kingdom.png';
import VietnameseFlag from '../assets/vietnam.png';
import GermanFlag from '../assets/germany.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      sx={{
        padding: '1.8rem 0',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
        borderTop: '1px solid rgba(224, 224, 224, 0.8)', // Lighter border
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 100, // Ensures it stays above the fireworks
        position: 'relative',
      }}
    >
      {/* Language Flags */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <IconButton onClick={() => changeLanguage('en')} aria-label="Change language to English">
          <img src={EnglishFlag} alt="English" style={{ width: '32px', height: 'auto' }} />
        </IconButton>
        <IconButton onClick={() => changeLanguage('vi')} aria-label="Change language to Vietnamese">
          <img src={VietnameseFlag} alt="Vietnamese" style={{ width: '32px', height: 'auto' }} />
        </IconButton>
        <IconButton onClick={() => changeLanguage('ge')} aria-label="Change language to German">
          <img src={GermanFlag} alt="German" style={{ width: '32px', height: 'auto' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;