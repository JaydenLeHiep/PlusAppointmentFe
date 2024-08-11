import React, { useState } from 'react';
import { Typography, Box, Badge, IconButton, Collapse } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Face2Icon from '@mui/icons-material/Face2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
  const [showIcons, setShowIcons] = useState(false);

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <Box textAlign="center" mb={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <IconButton color="primary" onClick={toggleIcons}>
            {showIcons ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Collapse in={showIcons} orientation="vertical">
            <Box display="flex" flexDirection="column" alignItems="center">
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
          </Collapse>
        </Box>
        <Typography variant="h5" gutterBottom className="business-title" style={{ flexGrow: 1 }}>
          {selectedBusiness.name}
        </Typography>
        <Box display="flex" alignItems="center">
          <Badge badgeContent={staffCount} color="primary" sx={{ marginRight: 2 }}>
            <InsertEmoticonTwoToneIcon className="material-symbols-outlined" onClick={handleStaffOpen} style={{ cursor: 'pointer' }} />
          </Badge>
          <Badge badgeContent={servicesCount} sx={{ "& .MuiBadge-badge": { backgroundColor: "green", color: "white" } }}>
            <AutoAwesomeTwoToneIcon className="material-symbols-outlined" onClick={handleServiceOpen} style={{ cursor: 'pointer' }} />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessInfo;
