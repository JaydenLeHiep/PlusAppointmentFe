import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateIcon from '@mui/icons-material/Update';

const NotificationPopover = ({ open, anchorEl, onClose, notifications }) => {
  
  const getIconAndColor = (type) => {
    switch (type) {
      case "Add":
        return { icon: <AddCircleOutlineIcon style={{ color: 'green' }} />, color: 'green' };
      case "Delete":
        return { icon: <DeleteOutlineIcon style={{ color: 'red' }} />, color: 'red' };
      case "Update":
        return { icon: <UpdateIcon style={{ color: 'orange' }} />, color: 'orange' };
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
        vertical: 'bottom',   // Positions it below the icon
        horizontal: 'right',  // Aligns it with the right of the icon
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: '200px',        // Make it smaller
          maxHeight: '250px',    // Constrain height with vertical scrolling
          overflowY: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,  // Ensure it stays on top
        },
      }}
    >
      <Box p={1}>


        {notifications.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={24} />
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
