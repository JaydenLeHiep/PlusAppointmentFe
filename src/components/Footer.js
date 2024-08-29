import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';  // Import Facebook icon

const Footer = () => {
  return (
    <Box
      sx={{
        padding: '1.8rem 0',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderTop: '1px solid #e0e0e0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        mt: 'auto',
        fontSize: '1.25rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <IconButton
          component="a"
          href="https://www.facebook.com/profile.php?id=100007379317091"
          target="_blank"
          aria-label="Duong's Facebook link"
        >
          <FacebookIcon sx={{ color: '#4267B2', fontSize: '32px' }} />
        </IconButton>
        <Link
          href="https://www.facebook.com/hiep.leduyy"
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
          Dương
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <IconButton
          component="a"
          href="https://www.facebook.com/hiepprofile"
          target="_blank"
          aria-label="Hiep's Facebook link"
        >
          <FacebookIcon sx={{ color: '#4267B2', fontSize: '32px' }} />
        </IconButton>
        <Link
          href="https://www.facebook.com/hiepprofile"
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