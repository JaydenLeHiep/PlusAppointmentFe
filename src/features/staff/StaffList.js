// StaffList.js

import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, CircularProgress } from '@mui/material';
import { fetchStaff } from '../../lib/apiClientStaff'; // Adjust the path as per your project structure
import '../../styles/css/StaffList.css'; // Ensure correct path to your CSS file

const StaffList = ({ businessId, onStaffSelect, searchQuery }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await fetchStaff(businessId);
        setStaff(data);
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching staff:', error.message);
      }
    };

    fetchStaffData();
  }, [businessId]);

  // Filtering staff based on search query
  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <CircularProgress />; // Display loading indicator while fetching data
  }

  return (
    <div>
      <Typography variant="h6">Staff</Typography>
      <List>
        {filteredStaff.map((staffMember) => (
          <ListItem key={staffMember.staffId} button onClick={() => onStaffSelect(staffMember)}>
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