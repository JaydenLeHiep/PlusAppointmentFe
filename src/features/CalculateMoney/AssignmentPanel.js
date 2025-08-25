import React, { useState } from 'react';
import { List } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  StaffListOuterContainer,
  AssignmentPanelTitleBox,
  AssignmentPanelTitle,
} from '../../styles/CalculateMoney/AssignmentPanelStyles';
import {
  StyledListItem,
  StyledListItemText,
  StyledTypography,
  StyledIconButton
} from '../../styles/OwnerStyle/StaffComPonent/StaffListStyles';
import AssignCustomerModal from './AssignCustomerModal';

const AssignmentPanel = ({ staff, businessId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpenModal = (staff) => {
    setSelectedStaff(staff);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStaff(null);
  };

  return (
    <div>
      <AssignmentPanelTitleBox>
        <AssignmentPanelTitle>
          Assign Customers to Staff
        </AssignmentPanelTitle>
      </AssignmentPanelTitleBox>

      <StaffListOuterContainer>
        <List dense>
          {staff?.map((s) => (
            <StyledListItem key={s.staffId}>
              <StyledListItemText
                primary={
                  <StyledTypography variant="body1" style={{ fontSize: '1.3em'}}>
                    {s.name}
                  </StyledTypography>
                }
                secondary={
                  <>
                    <span style={{ fontSize: '1em', color: '#1e88e5', fontWeight: 500 }}>{s.email}</span>
                    <br />
                    <span style={{ fontSize: '1em', color: '#0288d1' }}>{s.phone}</span>
                  </>
                }
              />
              <StyledIconButton
                edge="end"
                color="primary"
                aria-label="add-customer"
                onClick={() => handleOpenModal(s)}
              >
                <AddCircleOutlineIcon />
              </StyledIconButton>
            </StyledListItem>
          ))}
        </List>
      </StaffListOuterContainer>

      {selectedStaff && (
        <AssignCustomerModal
          open={openModal}
          onClose={handleCloseModal}
          staff={selectedStaff}
          businessId={businessId}
        />
      )}
    </div>
  );
};

export default AssignmentPanel;