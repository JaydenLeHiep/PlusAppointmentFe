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
            <InsertEmoticonTwoToneIcon
              onClick={handleStaffOpen}
              sx={{
                cursor: 'pointer',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                fontSize: '24px',
              }}
            />
          </Badge>
          <Badge
            badgeContent={servicesCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: 'green', color: 'white' } }}
          >
            <AutoAwesomeTwoToneIcon
              onClick={handleServiceOpen}
              sx={{
                cursor: 'pointer',
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                fontSize: '24px',
              }}
            />
          </Badge>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: '500',           
            marginBottom: '10px',
            fontFamily: '"Poppins", "Roboto", sans-serif',
          }}
        >
          {selectedBusiness.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default BusinessInfo;