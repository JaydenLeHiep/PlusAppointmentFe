import React, { useState } from 'react';
import {
  BusinessInfoContainer,
  BusinessInfoHeader,
  IconButtonGroup,
  CustomBadge,
  BusinessName,
  IconStyle,
} from '../../styles/OwnerStyle/BusinessInfoStyles';
import { Box, IconButton } from '@mui/material';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import InsertEmoticonTwoToneIcon from '@mui/icons-material/InsertEmoticonTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Face2Icon from '@mui/icons-material/Face2';
import NotificationsIcon from '@mui/icons-material/Notifications';

import NotificationPopover from './NotificationPopover'; // Import the new component

const BusinessInfo = ({
  selectedBusiness,
  handleStaffOpen,
  handleServiceOpen,
  handleCustomerOpen,
  servicesCount,
  staffCount,
  onBack,
  onAddAppointment,
  notifications
}) => {
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor

  const handleNotificationOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked icon
  };

  const handleNotificationClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const isNotificationPopoverOpen = Boolean(anchorEl); // Check if popover is open

  return (
    <BusinessInfoContainer>
      <BusinessInfoHeader>
        <IconButtonGroup>
          <IconButton color="primary" onClick={onBack}>
            <ArrowCircleLeftTwoToneIcon sx={IconStyle} />
          </IconButton>
          <IconButton color="secondary" onClick={onAddAppointment}>
            <AddCircleTwoToneIcon sx={IconStyle} />
          </IconButton>
          <IconButton color="primary" onClick={handleCustomerOpen}>
            <Face2Icon sx={IconStyle} />
          </IconButton>
        </IconButtonGroup>
        <IconButtonGroup>
          <CustomBadge badgeContent={staffCount} color="primary">
            <InsertEmoticonTwoToneIcon
              onClick={handleStaffOpen}
              sx={IconStyle}
            />
          </CustomBadge>
          <CustomBadge
            badgeContent={servicesCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: 'green', color: 'white' } }}
          >
            <AutoAwesomeTwoToneIcon
              onClick={handleServiceOpen}
              sx={IconStyle}
            />
          </CustomBadge>
          <CustomBadge
            badgeContent={notifications.length} // Notification count
            sx={{ "& .MuiBadge-badge": { backgroundColor: 'red', color: 'white' } }}
          >
            <NotificationsIcon
              onClick={handleNotificationOpen} // Open notification dialog
              sx={IconStyle}
            />
          </CustomBadge>
        </IconButtonGroup>
      </BusinessInfoHeader>
      <Box mt={2}>
        <BusinessName variant="h3" gutterBottom>
          {selectedBusiness.name}
        </BusinessName>
      </Box>

      {/* Use the NotificationPopover component */}
      <NotificationPopover
        open={isNotificationPopoverOpen}
        onClose={handleNotificationClose}
        notifications={notifications}
        anchorEl={anchorEl}
      />
    </BusinessInfoContainer>
  );
};

export default BusinessInfo;
