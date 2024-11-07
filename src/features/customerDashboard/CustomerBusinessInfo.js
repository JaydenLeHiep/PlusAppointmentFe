import React from 'react';
import { Box } from '@mui/material';
import {
  BusinessInfoContainer,
  BusinessName,
  InfoContainer,
  AddressWrapper,
  PhoneWrapper,
  IconWrapper,
  InfoText,
  LanguageSwitcherContainer,
  LanguageText,
  DividerText,
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
      {/* Right language selection */}
      <LanguageSwitcherContainer>
        <LanguageText
          onClick={() => changeLanguage('en')}
          isActive={i18n.language === 'en'}
        >
          EN
        </LanguageText>
        <DividerText>|</DividerText>
        <LanguageText
          onClick={() => changeLanguage('ge')}
          isActive={i18n.language === 'ge'}
        >
          GE
        </LanguageText>
      </LanguageSwitcherContainer>

      {/* Centered business info */}
      <Box
        sx={{
          flex: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative', // Make positioning relative to this Box
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <BusinessName>{businessInfo.name}</BusinessName>


        </div>
        <InfoContainer>
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
    </BusinessInfoContainer>
  );
};

export default CustomerBusinessInfo;
