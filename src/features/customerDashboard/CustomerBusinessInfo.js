import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  BusinessInfoContainer,
  BusinessName,
  InfoContainer,
  AddressWrapper,
  PhoneWrapper,
  IconWrapper,
  InfoText,
} from '../../styles/CustomerStyle/CustomerBusinessInfoStyle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from 'react-i18next';

const CustomerBusinessInfo = ({ businessInfo }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <BusinessInfoContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Left empty space */}
        <Box sx={{ flex: 1 }} />

        {/* Centered business info */}
        <Box sx={{ flex: 2, textAlign: 'center' }}>
          <BusinessName>{businessInfo.name}</BusinessName>
          <InfoContainer sx={{ justifyContent: 'center' }}>
            <AddressWrapper>
              <IconWrapper>
                <LocationOnIcon style={{ color: 'black' }} /> 
              </IconWrapper>
              <InfoText>{businessInfo.address}</InfoText>
            </AddressWrapper>
            <PhoneWrapper>
              <IconWrapper>
                <PhoneIcon style={{ color: 'black' }} />
              </IconWrapper>
              <InfoText>{businessInfo.phone}</InfoText>
            </PhoneWrapper>
          </InfoContainer>
        </Box>

        {/* Right language selection */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Typography
            onClick={() => changeLanguage('en')}
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: i18n.language === 'en' ? 'black' : 'gray' }}
          >
            EN
          </Typography>
          <Typography sx={{ fontSize: '0.875rem' }}>|</Typography>
          <Typography
            onClick={() => changeLanguage('ge')}
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: i18n.language === 'ge' ? 'black' : 'gray' }}
          >
            DE
          </Typography>
        </Box>
      </Box>
    </BusinessInfoContainer>
  );
};

export default CustomerBusinessInfo;
