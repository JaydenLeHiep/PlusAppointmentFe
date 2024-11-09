import React, { useState, useEffect, useRef, useMemo } from 'react';
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

const NotAvailableTimeDialog = ({ open, onClose, businessId, staffId, notAvailableTimes, notAvailableDates, staffName, notAvailableTimeId, openingHours }) => {
    const { addNotAvailableTime, updateNotAvailableTime, deleteNotAvailableTime } = useNotAvailableTimeContext();
    const { t } = useTranslation('notAvailableTime');
    const timeSlots = useMemo(() => [
        '08:00', '08:10', '08:20', '08:30', '08:40', '08:50',
        '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
        '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
        '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
        '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
        '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
        '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
        '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
        '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
        '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
        '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
        '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
        '20:00', '20:10', '20:20', '20:30', '20:40', '20:50',
        '21:00'
    ], []);
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
    const editTimeRef = useRef(null);
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
        if (notAvailableTimeId && open) {
            // Find the not-available time data for the given ID
            const timeToEdit = notAvailableTimes.find(time => time.notAvailableTimeId === notAvailableTimeId);
            if (timeToEdit) {
                setEditTimeId(timeToEdit.notAvailableTimeId);
                setEditingTimeId(timeToEdit.notAvailableTimeId);
                setSelectedDate(moment(timeToEdit.date).toDate());
                setSelectedIntervals([
                    moment(timeToEdit.from).local().format('HH:mm'),
                    moment(timeToEdit.to).local().format('HH:mm')
                ]);
                setReason(timeToEdit.reason || '');
            }
        }
    }, [notAvailableTimeId, open, notAvailableTimes]);

    useEffect(() => {
        if (editTimeRef.current) {
            editTimeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',

            });
        }
    }, [editTimeId, open]);

    useEffect(() => {
        const fetchUnavailableTimeSlots = async () => {
            if (selectedDate && staffId) {
                const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

                // Fetch unavailable time slots for the staff (appointments)
                const slots = await fetchNotAvailableTimeSlots(staffId, formattedDate);
                const localNotAvailableTimeSlots = slots.map(slot => moment.utc(slot).tz(moment.tz.guess()).format('HH:mm'));

                // Combine with notAvailableTimes for the same date
                const notAvailableTimesForDate = notAvailableTimes.filter(time =>
                    moment(time.date).format('YYYY-MM-DD') === formattedDate
                );

                // Calculate disabled slots based on both appointments and notAvailableTimes
                notAvailableTimesForDate.forEach(time => {
                    const fromTime = moment(time.from).local().format('HH:mm');
                    const toTime = moment(time.to).local().format('HH:mm');

                    const startIndex = timeSlots.indexOf(fromTime);
                    const endIndex = timeSlots.indexOf(toTime);

                    for (let i = startIndex; i < endIndex; i++) {
                        localNotAvailableTimeSlots.push(timeSlots[i]);
                    }
                });

                // Set the combined disabled time slots
                setDisabledTimeSlots(localNotAvailableTimeSlots);
            }
        };

        fetchUnavailableTimeSlots();
    }, [selectedDate, staffId, notAvailableTimes, timeSlots]);

    const handleAddOrUpdateNotAvailableTime = async () => {
        // Ensure only required fields are validated (reason is optional)
        if (!selectedIntervals.length || !selectedDate || !staffId) return;

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
            reason: reason.trim() || null,
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
        const today = moment().startOf('day');
        // Disable all dates before today
        if (date.isBefore(today)) {
            return true;
        }
        const staffNotAvailableDates = notAvailableDates.filter(({ staffId: dateStaffId }) => dateStaffId === staffId);
        const isInUnavailableRange = staffNotAvailableDates.some(({ startDate, endDate }) => {
            const start = moment(startDate);
            const end = moment(endDate);
            return date.isBetween(start, end, null, '[]');
        });
        return isInUnavailableRange || date.day() === 0; // Disables Sundays or any unavailable dates
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
                                .filter(time => time.staffId === staffId && moment(time.date).isSameOrAfter(moment().startOf('day'))) // Filter out past dates
                                .map((time) => (
                                    <React.Fragment key={time.notAvailableTimeId}>
                                        <ListItem
                                            sx={listItemStyle}
                                            ref={editTimeId === time.notAvailableTimeId ? editTimeRef : null}>
                                            <ListItemText
                                                primary={`Date: ${moment(time.date).format('DD-MM-YYYY')}`} // Changed format here
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" component="div">
                                                            {t('from')}: {moment(time.from).local().format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            {t('to')}: {moment(time.to).local().format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            {t('reason')}: {time.reason || ''}
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
                                                        onClick={() => setIsFormOpen(false)}
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
