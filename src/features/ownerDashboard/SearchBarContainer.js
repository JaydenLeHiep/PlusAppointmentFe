import React from 'react';
import { SearchBarContainer, StyledSearchBar } from '../../styles/OwnerStyle/SearchbarStyles';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <SearchBarContainer>
      <StyledSearchBar
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ color: '#1976d2' }} />
            </InputAdornment>
          ),
        }}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;