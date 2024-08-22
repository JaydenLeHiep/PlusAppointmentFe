import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Alert, Typography } from '@mui/material';
import { useStaffsContext } from '../../../context/StaffsContext';
import { ListItem, ItemBoldText, ItemText } from '../../../styles/CustomerStyle/ListItemStyles';

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
        <ListItem key={staffMember.staffId} onClick={() => onStaffSelect(staffMember)}>
          <Box>
            <ItemBoldText>{staffMember.name}</ItemBoldText>
            <ItemText variant="body2">{staffMember.email}</ItemText>
            <ItemText variant="body2">Phone: {staffMember.phone}</ItemText>
          </Box>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default StaffList;