import React from 'react';
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

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <BusinessInfoContainer>
      <BusinessName>{businessInfo.name}</BusinessName>
      <InfoContainer>
        <AddressWrapper>
          <IconWrapper>
            <LocationOnIcon />
          </IconWrapper>
          <InfoText>{businessInfo.address}</InfoText>
        </AddressWrapper>
        <PhoneWrapper>
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <InfoText>{businessInfo.phone}</InfoText>
        </PhoneWrapper>
      </InfoContainer>
    </BusinessInfoContainer>
  );
};

export default CustomerBusinessInfo;