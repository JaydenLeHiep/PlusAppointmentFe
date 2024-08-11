import React, { Fragment, useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import StaffForm from './StaffForm';

const StaffList = ({
  staff,
  editStaffId,
  handleEditStaff,
  confirmDeleteStaff,
  newStaff,
  setNewStaff,
  handleUpdateStaff,
  handleCancelForm,
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (editStaffId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editStaffId]);

  return (
    <List>
      {staff.map((member) => (
        <Fragment key={member.staffId}>
          <ListItem
            sx={{
              borderRadius: '8px',
              backgroundColor: '#f0f8ff',
              mb: 2,
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #1976d2',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#e6f1ff',
              },
            }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditStaff(member)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => confirmDeleteStaff(member.staffId)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {member.name}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    {member.email}
                  </Typography>
                  <br />
                  <Typography variant="body2" component="span">
                    {member.phone}
                  </Typography>
                </>
              }
            />
          </ListItem>
          {editStaffId === member.staffId && (
            <Collapse in={editStaffId === member.staffId}>
              <Box ref={formRef}>
                <StaffForm
                  title="Update Staff"
                  newStaff={newStaff}
                  setNewStaff={setNewStaff}
                  handleAction={() => handleUpdateStaff(member.staffId)}
                  handleCancelForm={handleCancelForm}
                  buttonText="Update Staff"
                  buttonColor="#28a745"
                />
              </Box>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default StaffList;