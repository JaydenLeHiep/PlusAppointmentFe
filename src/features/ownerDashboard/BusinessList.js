import React, { Fragment } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BusinessList = ({ businesses, onBusinessClick }) => {
  const { t } = useTranslation('businessList'); // Use the 'businessList' namespace for translations

  return (
    <Box>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: '#1976d2', 
          marginBottom: '20px'
        }}
      >
        {t('myBusinesses')}
      </Typography>
      
      <List>
        {businesses.map((business) => (
          <Fragment key={business.businessId}>
            <ListItem
              sx={{
                borderRadius: '12px',  // Slightly larger border radius
                backgroundColor: '#f0f8ff',
                mb: 3,  // Larger margin-bottom for spacing
                padding: '20px',  // Added padding for larger appearance
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #1976d2',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  backgroundColor: '#e6f1ff',
                },
              }}
              onClick={() => onBusinessClick(business)}
            >
              <ListItemText
                primary={
                  <Typography 
                    variant="h5"  // Larger font size for the business name
                    component="span" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#1976d2' 
                    }}
                  >
                    {business.name}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body1"  // Slightly larger font size for the address
                    component="span" 
                    sx={{ 
                      display: 'block',  // Forces the address to a new line
                      color: '#555',  // Darker color for contrast
                      marginTop: '8px'  // Adds space between the name and address
                    }}
                  >
                    {business.address}
                  </Typography>
                }
              />
            </ListItem>
          </Fragment>
        ))}
        {!businesses.length && (
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: '#999', 
              fontStyle: 'italic', 
              mt: 3 
            }}
          >
            {t('noBusinessesFound')}
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default BusinessList;
