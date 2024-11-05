import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchQuery, setSearchQuery, loadingCheckIns, handleLoadCheckIns, handleSendEmail, handleAddNewCustomer, handleDiscountCodeVerification }) => {
  const { t } = useTranslation('customerInfo');

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAlert, setDiscountAlert] = useState(null); // State to store alert message

  const handleOpenDiscountModal = () => setIsDiscountModalOpen(true);

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false);
    setDiscountCode('');
    setDiscountAlert(null);  // Reset alert when modal closes
  };

  const handleVerifyDiscountCode = async () => {
    try {
      const result = await handleDiscountCodeVerification(discountCode); // Call verification function
      setDiscountAlert({ message: result.message, severity: result.success ? 'success' : 'error' });
    } catch (error) {
      console.error("Verification failed:", error);
      setDiscountAlert({ message: t('discountCodeAppliedFailed'), severity: 'error' });
    }
  };

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
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Button variant="contained" color="primary" onClick={handleOpenDiscountModal} sx={{ mr: 2 }}>
            {t('verifyDiscount')}
          </Button>
        </Box>
        <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mr: 2 }}>
          {t('sendEmail')}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddNewCustomer}>
          {t('addCustomer')}
        </Button>
      </Box>
      
      {/* Discount Code Modal */}
      <Dialog
        open={isDiscountModalOpen}
        onClose={handleCloseDiscountModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {t('discountCodeVerification')}
          <IconButton
            aria-label="close"
            onClick={handleCloseDiscountModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {discountAlert && (
            <Alert severity={discountAlert.severity} sx={{ mb: 2 }}>
              {discountAlert.message}
            </Alert>
          )}
          <TextField
            label={t('codeVerify')}
            fullWidth
            margin="dense"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDiscountModal} color="secondary">
            {t('cancel')}
          </Button>
          <Button onClick={handleVerifyDiscountCode} color="primary">
            {t('verify')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchBar;