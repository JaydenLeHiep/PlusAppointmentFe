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
import NotificationPopover from './NotificationPopover';
import { useNotificationsContext } from '../../context/NotificationsContext';

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
  const { markNotificationsAsSeen } = useNotificationsContext();

  const handleNotificationOpen = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked icon
  };

  const handleNotificationClose = () => {
    // When user closes the popover, mark notifications as seen
    const unseenNotificationIds = notifications
      .filter(notification => !notification.isSeen)
      .map(notification => notification.notificationId);

    if (unseenNotificationIds.length > 0) {
      markNotificationsAsSeen(selectedBusiness.businessId, unseenNotificationIds);
    }

    setAnchorEl(null); // Close the popover
  };

  const isNotificationPopoverOpen = Boolean(anchorEl); // Check if popover is open

  const unseenNotificationCount = notifications.filter(notification => !notification.isSeen).length;

  return (
    <BusinessInfoContainer>
      <BusinessInfoHeader>
        <IconButtonGroup>
          <IconButton onClick={onBack}>
            <ArrowCircleLeftTwoToneIcon
              sx={{ ...IconStyle, color: '#D2691E' }} // Warm orange-brown
            />
          </IconButton>
          <IconButton onClick={onAddAppointment}>
            <AddCircleTwoToneIcon
              sx={{ ...IconStyle, color: '#FF4500' }} // Vibrant orange-red
            />
          </IconButton>
          <IconButton onClick={handleCustomerOpen}>
            <Face2Icon
              sx={{ ...IconStyle, color: '#B22222' }} // Warm crimson red
            />
          </IconButton>
        </IconButtonGroup>

        <IconButtonGroup>
          <CustomBadge
            badgeContent={staffCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: '#FF7F50', color: 'white' } }} // Coral for warmth
          >
            <InsertEmoticonTwoToneIcon
              onClick={handleStaffOpen}
              sx={IconStyle}
            />
          </CustomBadge>
          <CustomBadge
            badgeContent={servicesCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: '#FFA500', color: 'white' } }} // Vibrant orange
          >
            <AutoAwesomeTwoToneIcon
              onClick={handleServiceOpen}
              sx={IconStyle}
            />
          </CustomBadge>
          <CustomBadge
            badgeContent={unseenNotificationCount}
            sx={{ "& .MuiBadge-badge": { backgroundColor: '#FF6347', color: 'white' } }} // Tomato red
          >
            <NotificationsIcon
              onClick={handleNotificationOpen}
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
