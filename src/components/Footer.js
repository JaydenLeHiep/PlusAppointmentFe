import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import EnglishFlag from '../assets/united-kingdom.png';
import VietnameseFlag from '../assets/vietnam.png';
import GermanFlag from '../assets/germany.png'
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
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
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

      {/* Facebook Link for Hiệp */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <IconButton
          component="a"
          href="https://www.facebook.com/hiep.leduyy/"
          target="_blank"
          aria-label="Hiep's Facebook link"
        >
          <FacebookIcon sx={{ color: '#4267B2', fontSize: '32px' }} />
        </IconButton>
        <Link
          href="https://www.facebook.com/hiep.leduyy/"
          target="_blank"
          sx={{
            color: '#4267B2',
            fontSize: '1rem',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Hiệp
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
