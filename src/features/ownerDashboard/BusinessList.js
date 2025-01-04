import React, { Fragment } from 'react';
import { List, ListItemText, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  ContainerTypography,
  CustomListItem,
  BusinessNameTypography,
  BusinessAddressTypography,
  NoBusinessesFoundTypography,
} from '../../styles/OwnerStyle/BusinessListStyles';


const BusinessList = ({ businesses, onBusinessClick }) => {
  const { t } = useTranslation('businessList');

  const navigate = useNavigate(); // React Router's hook for navigation

  const handleChangePasswordClick = () => {
    navigate('/change-password');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'red',
            '&:hover': {
              backgroundColor: '#cc0000', // Slightly darker red on hover
            },
            color: 'white', // Ensures text is visible
          }}
          onClick={handleChangePasswordClick}
        >
          {t('changePassword')}
        </Button>
      </Box>

      <ContainerTypography variant="h5" gutterBottom>
        {t('myBusinesses')}
      </ContainerTypography>

      <List>
        {businesses.map((business) => (
          <Fragment key={business.businessId}>
            <CustomListItem onClick={() => onBusinessClick(business)}>
              <ListItemText
                primary={
                  <BusinessNameTypography variant="h5" component="span">
                    {business.name}
                  </BusinessNameTypography>
                }
                secondary={
                  <BusinessAddressTypography variant="body1" component="span">
                    {business.address}
                  </BusinessAddressTypography>
                }
              />
            </CustomListItem>
          </Fragment>
        ))}
        {!businesses.length && (
          <NoBusinessesFoundTypography variant="body1">
            {t('noBusinessesFound')}
          </NoBusinessesFoundTypography>
        )}
      </List>
    </Box>
  );
};

export default BusinessList;