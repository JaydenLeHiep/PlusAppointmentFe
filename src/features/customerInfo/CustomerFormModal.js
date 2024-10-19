import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Button, IconButton, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomerFormModal = ({ isFormModalOpen, setIsFormModalOpen, editCustomerData, setEditCustomerData, handleFormSubmit, editCustomerId, handleDateChange }) => {
  const { t } = useTranslation('customerInfo');

  const maxNoteLength = 255;

  const handleNoteChange = (event, editor) => {
    const data = editor.getData();
    setEditCustomerData({ ...editCustomerData, note: data });
  };

  return (
    <Dialog open={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
      <DialogTitle>
        {editCustomerId ? t('editCustomer') : t('addCustomer')}
        <IconButton aria-label="close" onClick={() => setIsFormModalOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label={t('customerName')}
            fullWidth
            margin="dense"
            value={editCustomerData.name}
            onChange={(e) => setEditCustomerData({ ...editCustomerData, name: e.target.value })}
          />
          <TextField
            label={t('customerEmail')}
            fullWidth
            margin="dense"
            value={editCustomerData.email}
            onChange={(e) => setEditCustomerData({ ...editCustomerData, email: e.target.value })}
          />
          <TextField
            label={t('customerPhone')}
            fullWidth
            margin="dense"
            value={editCustomerData.phone}
            onChange={(e) => setEditCustomerData({ ...editCustomerData, phone: e.target.value })}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ width: '50%', pr: 1 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={t('birthdayLabel')}
                  value={editCustomerData.birthday || null}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: '50%', pl: 1, textAlign: 'center', mt: 1 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('doYouWantToReceivePromotions')}</FormLabel>
                <RadioGroup
                  row
                  value={editCustomerData.wantsPromotion}
                  onChange={(e) => setEditCustomerData({ ...editCustomerData, wantsPromotion: e.target.value === 'true' })}
                  sx={{
                    justifyContent: 'center',
                  }}
                >
                  <FormControlLabel value="true" control={<Radio />} label={t('yes')} />
                  <FormControlLabel value="false" control={<Radio />} label={t('no')} />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              {t('Note: ')}
            </FormLabel>
            <CKEditor
              editor={ClassicEditor}
              data={editCustomerData.note || ''}
              onChange={handleNoteChange}
              style={{ height: '150px', marginTop: '10px' }}
              config={{
                toolbar: [
                  'bold', 'italic', 'underline', 'strikethrough',
                  'bulletedList', 'numberedList', 'blockQuote',
                  'alignment:left', 'alignment:center', 'alignment:right',
                  'heading', 'fontSize'
                ],
              }}
              onReady={editor => {
                console.log('Editor is ready to use!', editor);
              }}
            />
            <Typography variant="body2" sx={{ color: '#888', marginTop: '10px' }}>
              {`${maxNoteLength - (editCustomerData.note?.length || 0)} ${t('charactersRemaining')}`}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleFormSubmit} variant="contained" color="primary">
              {editCustomerId ? t('update') : t('add')}
            </Button>
            <Button onClick={() => setIsFormModalOpen(false)} variant="outlined" color="secondary" sx={{ ml: 2 }}>
              {t('cancel')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormModal;