import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const NotificationPopover = ({ open, anchorEl, onClose, notifications }) => {
  const { t } = useTranslation('notificationPopover'); // Initialize the translation function

  const getIconAndColor = (type) => {
    switch (type) {
      case "Add":
        return { icon: <AddCircleOutlineIcon style={{ color: 'green' }} />, color: 'green' };
      case "Cancel":
        return { icon: <DeleteOutlineIcon style={{ color: 'red' }} />, color: 'red' };
      case "Update":
        return { icon: <UpdateIcon style={{ color: 'orange' }} />, color: 'orange' };
      case "CheckIn":  // Add case for CheckIn
        return { icon: <CheckCircleOutlineIcon style={{ color: 'blue' }} />, color: 'blue' };

      default:
        return { icon: null, color: 'black' };
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: '200px',
          maxHeight: '250px',
          overflowY: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,
        },
      }}
    >
      <Box p={1}>
        {notifications.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              {t('noNewNotifications')} {/* Use the translation key */}
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification, index) => {
              const { icon } = getIconAndColor(notification.notificationType);
              return (
                <ListItem key={index} style={{ alignItems: 'flex-start' }}>
                  <Box mr={1}>{icon}</Box>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textPrimary">
                        {notification.message}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="textSecondary">
                        {new Date(notification.createdAt).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
