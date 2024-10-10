import React, { useState, useEffect, useRef } from 'react';
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
    TextField,
    Button
} from '@mui/material';
import { Add, Close as CloseIcon, Edit, Delete } from '@mui/icons-material';
import { useNotAvailableTimeContext } from '../../../context/NotAvailableTimeContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import GridBasedTimePicker from './GridBasedTimePicker';
import { fetchNotAvailableTimeSlots } from '../../../lib/apiClientAppointment';
import moment from 'moment-timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTranslation } from 'react-i18next';

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
    StyledDatePicker,
    gridBasedTimePickerWrapperStyle,
    addButtonContainerStyle,
    formActionButtonsStyle,
} from '../../../styles/OwnerStyle/StaffComPonent/NotAvailableTimeDialogStyles';

const NotAvailableTimeDialog = ({ open, onClose, businessId, staffId, notAvailableTimes, notAvailableDates, staffName }) => {
    const { addNotAvailableTime, updateNotAvailableTime, deleteNotAvailableTime } = useNotAvailableTimeContext();
    const { t } = useTranslation('notAvailableTime');

    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [editTimeId, setEditTimeId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [timeToDelete, setTimeToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [disabledTimeSlots, setDisabledTimeSlots] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTimeId, setEditingTimeId] = useState(null);
    const [reason, setReason] = useState('');

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

    useEffect(() => {
        const fetchUnavailableTimeSlots = async () => {
            if (selectedDate && staffId) {
                const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
                const slots = await fetchNotAvailableTimeSlots(staffId, formattedDate);
                const localNotAvailableTimeSlots = slots.map(slot => moment.utc(slot).tz(moment.tz.guess()).format('HH:mm'));
                setDisabledTimeSlots(localNotAvailableTimeSlots);
            }
        };

        fetchUnavailableTimeSlots();
    }, [selectedDate, staffId]);

    const handleAddOrUpdateNotAvailableTime = async () => {
        if (!selectedIntervals.length || !selectedDate || !staffId || !reason.trim()) return;

        const formattedDate = moment(selectedDate).tz('UTC').toISOString();
        const fromDateTime = moment(selectedDate).set({
            hour: parseInt(selectedIntervals[0].split(':')[0]),
            minute: parseInt(selectedIntervals[0].split(':')[1])
        }).tz('UTC').toISOString();
        const toDateTime = moment(selectedDate).set({
            hour: parseInt(selectedIntervals[1].split(':')[0]),
            minute: parseInt(selectedIntervals[1].split(':')[1])
        }).tz('UTC').toISOString();

        const notAvailableTimeData = {
            staffId,
            businessId,
            date: formattedDate,
            from: fromDateTime,
            to: toDateTime,
            reason: reason.trim(),
        };

        try {
            if (editTimeId) {
                await updateNotAvailableTime(businessId, staffId, editTimeId, notAvailableTimeData);
                setAlert({ message: t('successUpdate'), severity: 'success' });
            } else {
                await addNotAvailableTime(businessId, staffId, notAvailableTimeData);
                setAlert({ message: t('successAdd'), severity: 'success' });
            }
            setIsFormOpen(false);
            setEditTimeId(null);
            setEditingTimeId(null);
            setSelectedDate(null);
            setSelectedIntervals([]);
            setReason('');
        } catch (error) {
            setAlert({ message: editTimeId ? t('errorUpdate') : t('errorAdd'), severity: 'error' });
        }
    };

    const handleDeleteNotAvailableTime = async () => {
        if (!timeToDelete) return;
        try {
            await deleteNotAvailableTime(businessId, staffId, timeToDelete);
            setAlert({ message: t('successDelete'), severity: 'success' });
        } catch (error) {
            setAlert({ message: t('errorDelete'), severity: 'error' });
        } finally {
            setConfirmDialogOpen(false);
            setTimeToDelete(null);
        }
    };

    const handleAddNewClick = () => {
        setIsFormOpen(!isFormOpen);
        setSelectedDate(null);
        setSelectedIntervals([]);
        setEditTimeId(null);
        setEditingTimeId(null);
        setReason('');
        setAlert({ message: '', severity: '' });
    };

    const handleEditNotAvailableTime = (time) => {
        if (editingTimeId === time.notAvailableTimeId) {
            setEditingTimeId(null);
        } else {
            setEditTimeId(time.notAvailableTimeId);

            const selectedMomentDate = moment(time.date);
            setSelectedDate(selectedMomentDate.isValid() ? selectedMomentDate.toDate() : null);

            const fromTime = moment(time.from).local().format('HH:mm');
            const toTime = moment(time.to).local().format('HH:mm');

            setSelectedIntervals([fromTime, toTime]);

            setReason(time.reason || ''); // Set reason for editing
            setEditingTimeId(time.notAvailableTimeId);
            setIsFormOpen(false);
        }
    };

    const confirmDeleteTime = (timeId) => {
        setTimeToDelete(timeId);
        setConfirmDialogOpen(true);
    };

    const shouldDisableDate = (date) => {
        const staffNotAvailableDates = notAvailableDates.filter(({ staffId: dateStaffId }) => dateStaffId === staffId);
        const isInUnavailableRange = staffNotAvailableDates.some(({ startDate, endDate }) => {
            const start = moment(startDate);
            const end = moment(endDate);
            return date.isBetween(start, end, null, '[]');
        });

        return isInUnavailableRange || date.day() === 0;
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={dialogTitleStyle}>
                {t('Not available times for')} {staffName ? staffName : ''}
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
                <Box sx={addButtonContainerStyle}>
                    <Typography variant="h7" onClick={handleAddNewClick} sx={addNewDateTypographyStyle}>
                        <Add sx={{ fontSize: '40px' }} /> {t('addNewNotAvailableTime')}
                    </Typography>
                </Box>

                <Collapse in={isFormOpen}>
                    <Box sx={gridBasedTimePickerWrapperStyle}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <StyledDatePicker
                                label={t('selectDate')}
                                value={selectedDate ? moment(selectedDate) : null}
                                onChange={(newDate) => setSelectedDate(newDate ? moment(newDate).toDate() : null)}
                                shouldDisableDate={shouldDisableDate}
                                renderInput={(params) => <TextField {...params} />}
                                disablePast
                                sx={{ marginBottom: 2 }}
                            />
                        </LocalizationProvider>

                        {selectedDate && (
                            <GridBasedTimePicker
                                selectedIntervals={selectedIntervals}
                                setSelectedIntervals={setSelectedIntervals}
                                disabledTimeSlots={disabledTimeSlots}
                            />
                        )}

                        <TextField
                            label={t('Reason')}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 2 }}
                        />

                        <Box sx={formActionButtonsStyle}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddOrUpdateNotAvailableTime}
                                sx={addOrUpdateButtonStyle}
                            >
                                {editTimeId ? t('update') : t('add')}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setIsFormOpen(false)}
                                sx={cancelButtonStyle}
                            >
                                {t('cancel')}
                            </Button>
                        </Box>
                    </Box>
                </Collapse>

                <Box mt={4} width="100%">
                    <List>
                        {Array.isArray(notAvailableTimes) && notAvailableTimes.length > 0 ? (
                            notAvailableTimes
                                .filter(time => time.staffId === staffId)
                                .map((time) => (
                                    <React.Fragment key={time.notAvailableTimeId}>
                                        <ListItem sx={listItemStyle}>
                                            <ListItemText
                                                primary={`Date: ${moment(time.date).format('YYYY-MM-DD')}`}
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" component="div">
                                                            {t('from')}: {moment(time.from).local().format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            {t('to')}: {moment(time.to).local().format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            {t('reason')}: {time.reason || 'N/A'}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                            <Box display="flex" alignItems="center">
                                                <IconButton
                                                    edge="end"
                                                    aria-label="edit"
                                                    onClick={() => handleEditNotAvailableTime(time)}
                                                    sx={editButtonStyle}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => confirmDeleteTime(time.notAvailableTimeId)}
                                                    sx={deleteButtonStyle}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </ListItem>

                                        <Collapse in={editingTimeId === time.notAvailableTimeId}>
                                            <Box sx={gridBasedTimePickerWrapperStyle}>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <StyledDatePicker
                                                        label={t('selectDate')}
                                                        value={selectedDate ? moment(selectedDate) : null}
                                                        onChange={(newDate) => setSelectedDate(newDate ? moment(newDate).toDate() : null)}
                                                        shouldDisableDate={shouldDisableDate}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        disablePast
                                                        sx={{ marginBottom: 2 }}
                                                    />
                                                </LocalizationProvider>

                                                {selectedDate && (
                                                    <GridBasedTimePicker
                                                        selectedIntervals={selectedIntervals}
                                                        setSelectedIntervals={setSelectedIntervals}
                                                        disabledTimeSlots={disabledTimeSlots}
                                                    />
                                                )}

                                                <TextField
                                                    label={t('Reason')}
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    fullWidth
                                                    sx={{ marginTop: 2, marginBottom: 2 }}
                                                />

                                                <Box sx={formActionButtonsStyle}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleAddOrUpdateNotAvailableTime}
                                                        sx={addOrUpdateButtonStyle}
                                                    >
                                                        {editTimeId ? t('update') : t('add')}
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setIsFormOpen(false);
                                                            setEditingTimeId(null);
                                                        }}
                                                        sx={cancelButtonStyle}
                                                    >
                                                        {t('cancel')}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Collapse>
                                    </React.Fragment>
                                ))
                        ) : (
                            <Typography variant="body2">{t('noNotAvailableTimes')}</Typography>
                        )}
                    </List>
                </Box>
            </DialogContent>

            <ConfirmationDialog
                open={confirmDialogOpen}
                title={t('confirmDelete')}
                content={t('deleteMessage')}
                onConfirm={handleDeleteNotAvailableTime}
                onCancel={() => setConfirmDialogOpen(false)}
            />
        </Dialog>
    );
};

export default NotAvailableTimeDialog;
