import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper } from '@mui/material';
import { fetchStaff } from '../../lib/apiClientStaff'; // Adjust the path as per your project structure
import '../../styles/css/StaffList.css'; // Ensure correct path to your CSS file

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
            <Paper className="staff-item">
              <div className="staff-info">
                <Typography variant="body1" className="bold-text">{staffMember.name}</Typography>
                <Typography variant="body1">Phone: {staffMember.phone}</Typography>
              </div>
            </Paper>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StaffList;
