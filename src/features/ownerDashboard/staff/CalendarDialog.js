import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import { Add, Close as CloseIcon, Edit, Delete } from '@mui/icons-material';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { useNotAvailableDateContext } from '../../../context/NotAvailableDateContext';
import {
  dialogTitleStyle,
  closeIconButtonStyle,
  alertStyle,
  addNewDateTypographyStyle,
  listItemStyle,
  editButtonStyle,
  deleteButtonStyle,
  addOrUpdateButtonStyle,
  cancelButtonStyle,
  inlineCalendarBoxStyle,
  dateRangePickerStyle, // new style for DateRangePicker
} from '../../../styles/OwnerStyle/StaffComPonent/CalendarDialogStyle';
import moment from 'moment-timezone';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

const CalendarDialog = ({ open, onClose, businessId, staffId }) => {
  const { t } = useTranslation('calendarDialog');
  const { notAvailableDates, addNotAvailableDate, updateNotAvailableDate, deleteNotAvailableDate } = useNotAvailableDateContext();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [editDateId, setEditDateId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDateId, setEditingDateId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dateToDelete, setDateToDelete] = useState(null);

  const alertRef = useRef(null);

  useEffect(() => {
    if (alert.message) {
      if (alertRef.current) {
        alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleAddOrUpdateNotAvailableDate = async () => {
    const { startDate, endDate } = state[0];
    if (!startDate || !endDate || !staffId) return;

    const notAvailableDateData = {
        staffId,
        businessId,
        startDate: moment(startDate).tz('UTC').toISOString(),
        endDate: moment(endDate).tz('UTC').toISOString(),
        reason: 'Not Available',
      };

    try {
      if (editDateId) {
        await updateNotAvailableDate(businessId, staffId, editDateId, notAvailableDateData);
        setAlert({ message: t('Not available date updated success'), severity: 'success' });
      } else {
        await addNotAvailableDate(businessId, staffId, notAvailableDateData);
        setAlert({ message: t('Not available date added success'), severity: 'success' });
      }
      setIsFormOpen(false);
      setEditDateId(null);
      setEditingDateId(null);
    } catch (error) {
      setAlert({ message: editDateId ? t('notAvailableDateUpdatedError') : t('notAvailableDateAddedError'), severity: 'error' });
    }
  };

  const handleEditNotAvailableDate = (date) => {
    if (editingDateId === date.notAvailableDateId) {
      setEditingDateId(null);
    } else {
      setEditDateId(date.notAvailableDateId);
      setState([
        {
          startDate: new Date(date.startDate),
          endDate: new Date(date.endDate),
          key: 'selection',
        },
      ]);
      setEditingDateId(date.notAvailableDateId);
      setIsFormOpen(true);
    }
  };

  const confirmDeleteDate = (dateId) => {
    setDateToDelete(dateId);
    setConfirmDialogOpen(true);
  };

  const handleDeleteNotAvailableDate = async () => {
  if (!dateToDelete) return;
  try {
    await deleteNotAvailableDate(businessId, staffId, dateToDelete);
    setAlert({ message: 'Not available date deleted successfully!', severity: 'success' });
  } catch (error) {
    setAlert({ message: 'Failed to delete not available date.', severity: 'error' });
  } finally {
    setConfirmDialogOpen(false);
    setDateToDelete(null);
  }
};

  const handleAddNewClick = () => {
    setIsFormOpen(!isFormOpen);
    setState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    ]);
    setEditDateId(null);
    setEditingDateId(null);
    setAlert({ message: '', severity: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={dialogTitleStyle}>
        {t('selectNotAvailableDates')}
        <IconButton aria-label="close" onClick={onClose} sx={closeIconButtonStyle}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {alert.message && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ message: '', severity: '' })}
          ref={alertRef}
          sx={alertStyle}
        >
          {alert.message}
        </Alert>
      )}

      <DialogContent dividers>
        <Box mt={1} display="flex" justifyContent="center">
          <Typography variant="h7" onClick={handleAddNewClick} sx={addNewDateTypographyStyle}>
            <Add sx={{ fontSize: '40px' }} /> {t('Add new not available date')}
          </Typography>
        </Box>

        <Collapse in={isFormOpen && !editDateId}>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <DateRangePicker
              onChange={item => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1} 
              ranges={state}
              direction="horizontal"
              sx={dateRangePickerStyle} 
            />
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <button
                onClick={handleAddOrUpdateNotAvailableDate}
                style={addOrUpdateButtonStyle}
              >
                {editDateId ? t('Update') : t('Add')}
              </button>
              <button
                onClick={() => setIsFormOpen(false)}
                style={cancelButtonStyle}
              >
                {t('Cancel')}
              </button>
            </Box>
          </Box>
        </Collapse>

        <Box mt={4} width="100%">
          <List>
            {Array.isArray(notAvailableDates) && notAvailableDates.length > 0 ? (
              notAvailableDates.map((date) => (
                <React.Fragment key={date.notAvailableDateId}>
                  <ListItem sx={listItemStyle}>
                    <ListItemText
                      primary={`${t('Start date')}: ${new Date(date.startDate).toLocaleDateString()} - ${t('End date')}: ${new Date(date.endDate).toLocaleDateString()}`}
                      secondary={date.reason}
                    />
                    <Box display="flex" alignItems="center">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditNotAvailableDate(date)}
                        sx={editButtonStyle}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
  edge="end"
  aria-label="delete"
  onClick={() => confirmDeleteDate(date.notAvailableDateId)}
  sx={deleteButtonStyle}
>
  <Delete />
</IconButton>
                    </Box>
                  </ListItem>
  
                  <Collapse in={editingDateId === date.notAvailableDateId}>
                    <Box sx={inlineCalendarBoxStyle}>
                      <Typography variant="body1" mb={2}>{t('Select date range')}</Typography>
                      <DateRangePicker
                        onChange={item => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1} // Show only one month
                        ranges={state}
                        direction="horizontal"
                        sx={dateRangePickerStyle} // Apply custom style
                        showMonthAndYearPickers={false}
                      />
                      <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                        <button
                          onClick={handleAddOrUpdateNotAvailableDate}
                          style={addOrUpdateButtonStyle}
                        >
                          {t('Update')}
                        </button>
                        <button
                          onClick={() => setEditingDateId(null)}
                          style={cancelButtonStyle}
                        >
                          {t('Cancel')}
                        </button>
                      </Box>
                    </Box>
                  </Collapse>
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2">{t('No not available dates')}</Typography>
            )}
          </List>
        </Box>
      </DialogContent>
      <ConfirmationDialog
  open={confirmDialogOpen}
  title={t('Confirm Delete')}
  content={t('Are you sure you want to delete?')}
  onConfirm={handleDeleteNotAvailableDate}
  onCancel={() => setConfirmDialogOpen(false)}
/>
    </Dialog>
  );
};

export default CalendarDialog;