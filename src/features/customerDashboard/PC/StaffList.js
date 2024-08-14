import React, { useState, useEffect } from 'react';
import { Typography, Paper, CircularProgress, Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStaffsContext } from '../../staff/StaffsContext';

// Styled components using MUI's styled function
const StaffListItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  textAlign: 'left',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: 'auto',
  boxSizing: 'border-box',
  border: '1px solid #e0e0e0',
  '&:hover': {
    background: 'linear-gradient(145deg, #ffffff, #f0f8ff)',
    transform: 'translateY(-4px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const ItemBoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '1.4rem',
  marginBottom: theme.spacing(1),
}));

const ItemText = styled(Typography)(({ theme }) => ({
  color: '#555',
  fontSize: '1.1rem',
  marginBottom: theme.spacing(0.5),
}));

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
        setError('Failed to fetch staff. Please try again.');
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [businessId, fetchAllStaff]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredStaff.length === 0) {
    return <Typography variant="body2">No staff members match your search.</Typography>;
  }

  return (
    <React.Fragment>
      {filteredStaff.map(staffMember => (
        <StaffListItem key={staffMember.staffId} onClick={() => onStaffSelect(staffMember)}>
          <Box>
            <ItemBoldText>{staffMember.name}</ItemBoldText>
            <ItemText variant="body2">{staffMember.email}</ItemText>
            <ItemText variant="body2">Phone: {staffMember.phone}</ItemText>
          </Box>
        </StaffListItem>
      ))}
    </React.Fragment>
  );
};

export default StaffList;