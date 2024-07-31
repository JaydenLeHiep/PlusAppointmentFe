import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Paper, CircularProgress } from '@mui/material';
import { useStaffsContext } from '../staff/StaffsContext'; 
import '../../styles/css/StaffList.css'; 

const StaffList = ({ businessId, onStaffSelect, searchQuery }) => {
  const { staff, fetchAllStaff } = useStaffsContext(); // Use the context
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        await fetchAllStaff(businessId); // Fetch staff using the context
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching staff:', error.message);
      }
    };

    fetchStaffData();
  }, [businessId, fetchAllStaff]);

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
