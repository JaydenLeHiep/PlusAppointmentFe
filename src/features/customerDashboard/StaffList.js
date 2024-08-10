import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, CircularProgress, Box, Alert } from '@mui/material';
import { useStaffsContext } from '../staff/StaffsContext';
import '../../styles/css/CustomerCss/StaffList.css'; 

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
    <div>
      <Typography variant="h6">Staff</Typography>
      <List>
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staffMember) => (
            <ListItem key={staffMember.staffId} button onClick={() => onStaffSelect(staffMember)}>
              <Paper className="staff-list-item">
                <div className="staff-item-container">
                  <div className="staff-item-info">
                    <Typography variant="body1" className="staff-item-bold-text">{staffMember.name}</Typography>
                    <Typography variant="body2">{staffMember.email}</Typography>
                    <Typography variant="body2">Phone: {staffMember.phone}</Typography>
                  </div>
                </div>
              </Paper>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No staff members match your search.</Typography>
        )}
      </List>
    </div>
  );
};

export default StaffList;