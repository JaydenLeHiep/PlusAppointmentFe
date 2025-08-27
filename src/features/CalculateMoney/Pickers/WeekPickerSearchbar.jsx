import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const WeekPickerSearchBar = ({ value, onChange, placeholder = "Search week number" }) => (
  <TextField
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    size="small"
    variant="outlined"
    fullWidth
    InputProps={{
      sx: {
        borderRadius: 2,
        bgcolor: "#f6f8fb",
        boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
        height: 40,
        fontSize: 16,
        flex: 1,
      },
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon sx={{ color: '#1976d2' }} />
        </InputAdornment>
      ),
    }}
    sx={{
      borderRadius: 2,
      bgcolor: "#f6f8fb",
      boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
      height: 40,
      fontSize: 16,
      flex: 1,
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        bgcolor: "#f6f8fb",
        height: 40,
      },
      '& .MuiInputBase-input': {
        fontSize: 16,
        pt: 1,
        pb: 1,
      },
    }}
  />
);

export default WeekPickerSearchBar;