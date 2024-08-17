import { Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ServiceList from '../PC/ServiceList';
import StaffList from '../PC/StaffList';
import CustomerButtonDashboard from './CustomerButtonDashboard';

// Styled components using MUI's styled function
const CustomerListContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid
  gap: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', // Stronger shadow for a more pronounced effect
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  margin: 'auto',
  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
  '&:hover': {
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', // Slightly stronger hover shadow
    transform: 'translateY(-2px)', // Subtle hover lift effect
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns on medium screens
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr', // Single column on small screens
    padding: theme.spacing(2),
  },
}));

const CustomerListHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: `0 ${theme.spacing(2)}px`, 
  width: '100%',
  boxSizing: 'border-box',
  marginLeft: '35px'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: theme.spacing(2), // Add some space on top for smaller screens
  },
}));

const ListsServiceStaff = ({ view, businessId, onServiceSelect, onStaffSelect, searchQuery, setSearchQuery, onViewChange }) => {
  const handleStaffSelect = (staff) => {
    onStaffSelect(staff);  // Use this to pass the selected staff up
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', margin: 'auto', padding: { xs: '0 16px', sm: '0 24px', md: '0' }, boxSizing: 'border-box' }}>
      <CustomerListHeader>
        <CustomerButtonDashboard view={view} onViewChange={onViewChange} />
        <StyledTextField
          placeholder="Search..."
          onChange={handleSearchChange}
          variant="outlined"
          value={searchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: { xs: '100%', sm: '300px' },
            width: '100%',
            flex: '1 1 auto',
            marginRight: '70px'
          }}
        />
      </CustomerListHeader>
      <CustomerListContainer
        sx={{
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          backgroundImage: 'linear-gradient(to right, #ffffff, #f0f8ff)', // Soft gradient for a modern look
          border: '1px solid #e0e0e0', // Light border for a clean edge
        }}
      >
        {view === 'services' && (
          <ServiceList
            businessId={businessId}
            searchQuery={searchQuery}
            onServiceSelect={onServiceSelect}
          />
        )}
        {view === 'staffs' && (
          <StaffList
            businessId={businessId}
            searchQuery={searchQuery}
            onStaffSelect={handleStaffSelect}
          />
        )}
      </CustomerListContainer>
    </Box>
  );
};

export default ListsServiceStaff;