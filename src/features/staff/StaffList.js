import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, CircularProgress, Box, Alert } from '@mui/material';
import { useStaffsContext } from '../staff/StaffsContext'; 

const StaffList = ({ businessId, onStaffSelect, searchQuery }) => {
  const { staff, fetchAllStaff } = useStaffsContext(); // Use the context
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to track any errors

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        await fetchAllStaff(businessId); // Fetch staff using the context
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching staff:', error.message);
        setError('Failed to fetch staff. Please try again.'); // Set error message
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [businessId, fetchAllStaff]);

  // Filtering staff based on search query
  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    ); // Display loading indicator while fetching data
  }

  if (error) {
    return (
      <Box mt={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    ); // Display an error message if there's an error
  }

  return (
    <div>
      <Typography variant="h6">Staff</Typography>
      <List>
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staffMember) => (
            <ListItem key={staffMember.staffId} button onClick={() => onStaffSelect(staffMember)}>
              <Paper className="staff-item">
                <div className="staff-info">
                  <Typography variant="body1" className="bold-text">{staffMember.name}</Typography>
                  <Typography variant="body2">{staffMember.email}</Typography>
                  <Typography variant="body2">Phone: {staffMember.phone}</Typography>
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