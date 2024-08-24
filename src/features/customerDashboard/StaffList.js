import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Alert, Typography, IconButton, Collapse } from '@mui/material';
import { useStaffsContext } from '../../context/StaffsContext';
import { ListItem, ItemBoldText, ItemText } from '../../styles/CustomerStyle/ListItemStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StaffList = ({ businessId, onStaffSelect, searchQuery, selectedStaff }) => {
  const { staff, fetchAllStaff } = useStaffsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedStaff, setExpandedStaff] = useState(null);
  const isMobile = useMediaQuery('(max-width:500px)');

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

  const handleToggleExpand = (staffId) => {
    setExpandedStaff(prev => (prev === staffId ? null : staffId));
  };

  const handleStaffClick = (staffMember) => {
    onStaffSelect(staffMember);
  };

  return (
    <React.Fragment>
      {filteredStaff.map(staffMember => (
        <ListItem
          key={staffMember.staffId}
          selected={selectedStaff && selectedStaff.staffId === staffMember.staffId}
          onClick={() => handleStaffClick(staffMember)} // Toggle selection on click
          sx={{ marginBottom: 2 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <ItemBoldText>{staffMember.name}</ItemBoldText>
            {isMobile && (
              <IconButton onClick={(e) => { e.stopPropagation(); handleToggleExpand(staffMember.staffId); }}>
                <ExpandMoreIcon
                  style={{
                    transform: expandedStaff === staffMember.staffId ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </IconButton>
            )}
          </Box>
          <Collapse in={!isMobile || expandedStaff === staffMember.staffId}>
            <ItemText variant="body2">{staffMember.email}</ItemText>
            <ItemText variant="body2">Phone: {staffMember.phone}</ItemText>
          </Collapse>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default StaffList;