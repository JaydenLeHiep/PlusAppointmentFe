import React, { useState, useEffect } from 'react';
import { Typography, Paper, CircularProgress, Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStaffsContext } from '../../staff/StaffsContext';

// Styled components using MUI's styled function
const StaffListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  textAlign: 'left',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '180px',
  boxSizing: 'border-box',
  border: '1px solid #e0e0e0',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const StaffItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});

const StaffItemInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'left',
}));

const StaffItemBoldText = styled(Typography)({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.2rem',
});

const StaffItemInfoText = styled(Typography)({
  color: '#555',
  fontSize: '1.1rem',
  margin: '4px 0',
});

const StaffList = ({ businessId, onStaffSelect, searchQuery }) => {
  const { staff, fetchAllStaff } = useStaffsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        await fetchAllStaff(businessId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff:', error.message);
        setError('Failed to fetch staff. Please try again.');
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [businessId, fetchAllStaff]);

  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <React.Fragment>
      {filteredStaff.length > 0 ? (
        filteredStaff.map((staffMember) => (
          <StaffListItem key={staffMember.staffId} onClick={() => onStaffSelect(staffMember)}>
            <StaffItemContainer>
              <StaffItemInfo>
                <StaffItemBoldText variant="body1">{staffMember.name}</StaffItemBoldText>
                <StaffItemInfoText variant="body2">{staffMember.email}</StaffItemInfoText>
                <StaffItemInfoText variant="body2">Phone: {staffMember.phone}</StaffItemInfoText>
              </StaffItemInfo>
            </StaffItemContainer>
          </StaffListItem>
        ))
      ) : (
        <Typography variant="body2">No staff members match your search.</Typography>
      )}
    </React.Fragment>
  );
};

export default StaffList;