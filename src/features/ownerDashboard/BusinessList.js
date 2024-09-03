import React, { Fragment } from 'react';
import { List, ListItemText, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ContainerTypography,
  CustomListItem,
  BusinessNameTypography,
  BusinessAddressTypography,
  NoBusinessesFoundTypography,
} from '../../styles/OwnerStyle/BusinessListStyles';

const BusinessList = ({ businesses, onBusinessClick }) => {
  const { t } = useTranslation('businessList');

  return (
    <Box>
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