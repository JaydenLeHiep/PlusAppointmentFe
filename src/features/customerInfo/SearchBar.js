import React from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchQuery, setSearchQuery, loadingCheckIns, handleLoadCheckIns, handleSendEmail, handleAddNewCustomer }) => {
  const { t } = useTranslation('customerInfo');
  
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <TextField
        label={t('searchCustomer')}
        margin="dense"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: '28.5%' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ mr: 2 }}>
        <LoadingButton
          onClick={handleLoadCheckIns}
          loading={loadingCheckIns}
          variant="contained"
          sx={{
            minWidth: 40,
            mr: 2,
            color: 'black',
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
          startIcon={!loadingCheckIns && <RefreshIcon />}
          loadingIndicator={<CircularProgress size={20} style={{ color: 'black' }} />}
        />
        <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mr: 2 }}>
          {t('sendEmail')}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddNewCustomer}>
          {t('addCustomer')}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;