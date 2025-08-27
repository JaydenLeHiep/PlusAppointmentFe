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
import SearchBar from '../ownerDashboard/SearchBarContainer'; 

const AssignmentPanel = ({ staff, businessId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleOpenModal = (staff) => {
    setSelectedStaff(staff);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStaff(null);
  };

  const filteredStaff = staff?.filter(s =>
    s.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ) || [];

  return (
    <div>
      <AssignmentPanelTitleBox>
        <AssignmentPanelTitle>
          Assign Customers to Staff
        </AssignmentPanelTitle>
      </AssignmentPanelTitleBox>

      <div style={{ margin: '18px 0 12px 0' }}>
        <SearchBar
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search staff name..."
        />
      </div>

      <StaffListOuterContainer>
        <List dense>
          {filteredStaff.length === 0 && (
            <div style={{ textAlign: "center", color: "#aaa", margin: "30px 0" }}>
              No staff found.
            </div>
          )}
          {filteredStaff.map((s) => (
            <StyledListItem key={s.staffId}>
              <StyledListItemText
                primary={
                  <StyledTypography variant="body1" style={{ fontSize: '1.3em' }}>
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