import React from 'react';
import { Typography, Box, Badge } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';

const BusinessInfo = ({ selectedBusiness, staff = [], appointments = [], handleStaffOpen, handleServiceOpen }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} position="relative">
        <Typography variant="h5" gutterBottom className="business-title" flexGrow={1}>
          {selectedBusiness.name}
        </Typography>
        <Box display="flex" alignItems="center" position="absolute" right={0}>
          <Badge badgeContent={staff.length} color="primary" sx={{ marginRight: 2 }}>
            <InsertEmoticonTwoToneIcon className="material-symbols-outlined" onClick={handleStaffOpen} style={{ cursor: 'pointer' }} />
          </Badge>
          <Badge badgeContent={appointments.length} color="error" sx={{ marginRight: 2 }}>
            <NotificationsTwoToneIcon className="material-symbols-outlined" />
          </Badge>
          <Badge badgeContent={selectedBusiness.services?.length || 0} sx={{ "& .MuiBadge-badge": { backgroundColor: "green", color: "white" } }}>
            <AutoAwesomeTwoToneIcon className="material-symbols-outlined" onClick={handleServiceOpen} style={{ cursor: 'pointer' }} />
          </Badge>
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
