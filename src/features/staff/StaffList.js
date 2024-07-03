import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, Stack } from '@mui/material';
import { fetchStaff } from '../../lib/apiClientStaff'; // Adjust the path as per your project structure

const StaffList = ({ businessId }) => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await fetchStaff(businessId);
        setStaff(data);
      } catch (error) {
        console.error('Error fetching staff:', error.message);
      }
    };

    fetchStaffData();
  }, [businessId]);

  return (
    <div>
      <Typography variant="h6">Staff</Typography>
      <List>
        {staff.map((staffMember) => (
          <ListItem key={staffMember.staffId}>
            <Paper style={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
              <Stack spacing={1}>
                <Typography variant="h6">{staffMember.name}</Typography>
                <Typography>Email: {staffMember.email}</Typography>
                <Typography>Phone: {staffMember.phone}</Typography>
              </Stack>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StaffList;
