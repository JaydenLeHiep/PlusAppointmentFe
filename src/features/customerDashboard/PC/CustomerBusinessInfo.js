import React from 'react';
import {
  Container,
  BackButtonContainer,
  StyledIconButton,
  BusinessName,
  InfoContainer,
  AddressText,
  StyledLocationOnIcon,
  PhoneText,
  StyledPhoneIcon,
} from '../../../styles/CustomerStyle/CustomerBusinessInfoStyle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomerBusinessInfo = ({ businessInfo, view, onBackClick }) => {
  return (
    <Container>
      {/* Back Button */}
      {view !== 'services' && (
        <BackButtonContainer>
          <StyledIconButton onClick={onBackClick}>
            <ArrowBackIcon />
          </StyledIconButton>
        </BackButtonContainer>
      )}

      {/* Business Name Centered */}
      <BusinessName variant="h2" component="h2">
        {businessInfo.name}
      </BusinessName>

      {/* Address and Phone */}
      <InfoContainer>
        <AddressText variant="body2" component="div">
          <StyledLocationOnIcon />
          {businessInfo.address}
        </AddressText>
        <PhoneText variant="body2" component="div">
          <StyledPhoneIcon />
          {businessInfo.phone}
        </PhoneText>
      </InfoContainer>
    </Container>
  );
};

export default CustomerBusinessInfo;