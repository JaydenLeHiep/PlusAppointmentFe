import React from 'react';
import { Typography, Box, Badge, IconButton } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
// import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const BusinessInfo = ({ selectedBusiness, staff = [], appointments = [], handleStaffOpen, handleServiceOpen, servicesCount, staffCount, appointmentsCount, onBack, onAddAppointment }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <IconButton color="primary" onClick={onBack}>
            <ArrowCircleLeftTwoToneIcon />
          </IconButton>
          <IconButton color="secondary" onClick={onAddAppointment}>
            <AddCircleTwoToneIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" gutterBottom className="business-title" style={{ flexGrow: 1 }}>
          {selectedBusiness.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Badge badgeContent={staffCount} color="primary" sx={{ marginRight: 2 }}>
            <InsertEmoticonTwoToneIcon className="material-symbols-outlined" onClick={handleStaffOpen} style={{ cursor: 'pointer' }} />
          </Badge>
          
          {/* Need to fix this shit */}

          {/* <Badge badgeContent={appointmentsCount} color="error" sx={{ marginRight: 2 }}>
            <NotificationsTwoToneIcon className="material-symbols-outlined" />
          </Badge> */}
          <Badge badgeContent={servicesCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "green", color: "white" } }}>
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
