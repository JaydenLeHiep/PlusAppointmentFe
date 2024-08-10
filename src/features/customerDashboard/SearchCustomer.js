import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchCustomer = ({ onChange }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      onChange={onChange} // Pass onChange handler from parent component
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          backgroundColor: '#ffffff', // Set background color to white
          borderRadius: '8px', // Rounded corners for a smooth look
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        },
      }}
      fullWidth
      sx={{
        marginBottom: 2, // Add margin bottom to create space between elements
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none', // Remove the default border for a cleaner look
          },
        },
      }}
    />
  );
};

export default SearchCustomer;