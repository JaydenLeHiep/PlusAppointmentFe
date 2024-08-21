import React from 'react';
import {
  Container,
  BusinessName,
  InfoContainer,
  AddressText,
  StyledLocationOnIcon,
  PhoneText,
  StyledPhoneIcon,
} from '../../../styles/CustomerStyle/CustomerBusinessInfoStyle';

const CustomerBusinessInfo = ({ businessInfo }) => {
  return (
    <Container>
      <BusinessName variant="h4">
        {businessInfo.name}
      </BusinessName>

      <InfoContainer>
        <AddressText variant="body2">
          <StyledLocationOnIcon />
          {businessInfo.address}
        </AddressText>
        <PhoneText variant="body2">
          <StyledPhoneIcon />
          {businessInfo.phone}
        </PhoneText>
      </InfoContainer>
    </Container>
  );
};

export default CustomerBusinessInfo;