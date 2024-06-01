// src/features/ownerDashboard/BusinessList.js

import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const BusinessList = ({ businesses, handleBusinessClick }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom className="text-center">
        My Businesses
      </Typography>
      {businesses.length ? (
        businesses.map((business) => (
          <Card key={business.businessId} className="business-card" onClick={() => handleBusinessClick(business.businessId)}>
            <Typography variant="h6">{business.name}</Typography>
            <Typography variant="body2">{business.address}</Typography>
          </Card>
        ))
      ) : (
        <Typography variant="body1" className="text-center">No businesses found.</Typography>
      )}
    </Box>
  );
};

export default BusinessList;
