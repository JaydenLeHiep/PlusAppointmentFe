import React from 'react';
import { Box, InputBase, styled } from '@mui/material';

const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',  // Center the input
  borderRadius: '30px',
  border: '1px solid #ddd',
  padding: '0 10px',
  width: '400px',
  height: '54px',

  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  textAlign: 'center',  // Center the text within the input
}));

const SearchBar = ({ value, onChange }) => {
  return (
    <SearchBarContainer>
      <StyledInputBase
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;