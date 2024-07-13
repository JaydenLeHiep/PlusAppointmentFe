// SearchCustomer.js
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
      }}
      fullWidth
      style={{ marginBottom: 20 }} // Adding margin bottom to create a gap
    />
  );
};

export default SearchCustomer;
