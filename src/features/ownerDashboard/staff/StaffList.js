import React, { Fragment, useRef, useEffect, useState } from 'react';
import { List, Typography, Collapse, Box } from '@mui/material';
import { Delete, Edit, Event as EventIcon, AccessTime as ClockIcon } from '@mui/icons-material'; 
import { useTranslation } from 'react-i18next';
import StaffForm from './StaffForm';
import SearchBar from '../SearchBarContainer';
import { 
  StyledListItem, 
  StyledListItemText, 
  StyledTypography, 
  StyledIconButton 
} from '../../../styles/OwnerStyle/StaffComPonent/StaffListStyles';

const StaffList = ({
  staff,
  editStaffId,
  handleEditStaff,
  confirmDeleteStaff,
  newStaff,
  setNewStaff,
  handleUpdateStaff,
  handleCancelForm,
  handleCalendarIconClick, 
  handleClockIconClick 
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
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
      />

      <List>
        {filteredStaff.map((member) => (
          <Fragment key={member.staffId}>
            <StyledListItem>
              <StyledListItemText
                primary={
                  <StyledTypography variant="body1">
                    {member.name}
                  </StyledTypography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span" noWrap>
                      {member.email}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      {member.phone}
                    </Typography>
                  </>
                }
              />
              <Box display="flex" alignItems="center">
                <StyledIconButton aria-label="clock" onClick={() => handleClockIconClick(member.staffId)}>
                  <ClockIcon />
                </StyledIconButton>
                <StyledIconButton aria-label="calendar" onClick={() => handleCalendarIconClick(member.staffId)}>
                  <EventIcon />
                </StyledIconButton>
                <StyledIconButton aria-label="edit" onClick={() => handleEditStaff(member)}>
                  <Edit />
                </StyledIconButton>
                <StyledIconButton aria-label="delete" onClick={() => confirmDeleteStaff(member.staffId)}>
                  <Delete />
                </StyledIconButton>
              </Box>
            </StyledListItem>
            {editStaffId === member.staffId && (
              <Collapse in={editStaffId === member.staffId}>
                <Box ref={formRef}>
                  <StaffForm
                    title={t('updateStaff')}
                    newStaff={newStaff}
                    setNewStaff={setNewStaff}
                    handleAction={() => handleUpdateStaff(member.staffId)}
                    handleCancelForm={handleCancelForm}
                    buttonText={t('updateStaffButton')}
                    buttonColor="#28a745"
                    mode="update" 
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