import React from 'react';
import { Typography, Box, Badge } from '@mui/material';
import { People } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const BusinessInfo = ({ selectedBusiness, staff, appointments }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h5" gutterBottom className="business-title" flexGrow={1}>
          {selectedBusiness.name}
        </Typography>
        <Box display="flex" alignItems="center" position="absolute" right={0}>
          <Badge badgeContent={staff.length} color="primary" sx={{ marginRight: 2 }}>
            <People className="material-symbols-outlined" />
          </Badge>
          <Badge badgeContent={appointments.length} color="error" sx={{ marginRight: 2 }}>
            <NotificationsIcon className="material-symbols-outlined" />
          </Badge>
          {/* Commented out service section */}
          {/* <Badge badgeContent={selectedBusiness.services?.length || 0} sx={{ "& .MuiBadge-badge": { backgroundColor: "green", color: "white" } }}>
            <LocalOfferIcon className="material-symbols-outlined" />
          </Badge> */}
        </Box>
      </Box>
      <Typography variant="body1" gutterBottom className="business-detail">
        <strong>Address:</strong> {selectedBusiness.address}
      </Typography>
      <Typography variant="body1" gutterBottom className="business-detail">
        <strong>Phone:</strong> {selectedBusiness.phone}
      </Typography>
      <Typography variant="body1" gutterBottom className="business-detail">
        <strong>Email:</strong> {selectedBusiness.email}
      </Typography>
    </Box>
  );
};

export default BusinessInfo;
