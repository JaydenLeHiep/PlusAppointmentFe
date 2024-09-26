import React from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
  UpdateAppointmentButtonContainer,
  UpdateAppointmentButton
} from '../../styles/CustomerStyle/CustomerBusinessInfoStyle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from 'react-i18next';

const CustomerBusinessInfo = ({ businessInfo }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isUpdateAppointmentPath = location.pathname.includes('/update-appointment');

  const handleButtonClick = () => {
    if (isUpdateAppointmentPath) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate(`/update-appointment?business_name=${businessInfo.name}`);
    }
  };

  return (
    <BusinessInfoContainer>
      {/* Left "Update Appointment" or "Back" button */}
      <UpdateAppointmentButtonContainer>
        <UpdateAppointmentButton variant="contained" color="primary" onClick={handleButtonClick}>
          {isUpdateAppointmentPath ? 'Back' : 'Delete Appointment'}
        </UpdateAppointmentButton>
      </UpdateAppointmentButtonContainer>

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
        }}
      >
        <BusinessName>{businessInfo.name}</BusinessName>
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