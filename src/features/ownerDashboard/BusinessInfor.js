import React from 'react';
import { Typography, Box, Badge, IconButton } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Face2Icon from '@mui/icons-material/Face2';

const BusinessInfo = ({
  selectedBusiness,
  handleStaffOpen,
  handleServiceOpen,
  handleCustomerOpen,
  servicesCount,
  staffCount,
  onBack,
  onAddAppointment,
}) => {
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
          <IconButton color="primary" onClick={handleCustomerOpen}>
            <Face2Icon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center">
          <Badge badgeContent={staffCount} color="primary" sx={{ marginRight: 2 }}>
            <InsertEmoticonTwoToneIcon className="material-symbols-outlined" onClick={handleStaffOpen} style={{ cursor: 'pointer' }} />
          </Badge>
          <Badge badgeContent={servicesCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "green", color: "white" } }}>
            <AutoAwesomeTwoToneIcon className="material-symbols-outlined" onClick={handleServiceOpen} style={{ cursor: 'pointer' }} />
          </Badge>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography
          variant="h2"
          gutterBottom
          className="business-title"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            marginBottom: '10px',
            fontFamily: "'Dancing Script', cursive", // Apply calligraphy font
          }}
        >
          {selectedBusiness.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default BusinessInfo;