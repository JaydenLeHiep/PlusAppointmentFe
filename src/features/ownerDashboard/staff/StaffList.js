import React, { Fragment, useRef, useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import StaffForm from './StaffForm';
import SearchBar from '../SearchBarContainer'; // Ensure the correct path to the SearchBar component

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
  const { t } = useTranslation('staffList');
  const formRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (editStaffId !== null && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [editStaffId]);

  // Filter staff members based on the search query
  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Integrate the SearchBar */}
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
      />

      <List>
        {filteredStaff.map((member) => (
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
    </Box>
  );
};

export default StaffList;
