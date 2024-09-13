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

const NotAvailableTimeDialog = ({ open, onClose, businessId, staffId, notAvailableTimes, notAvailableDates }) => {
    const { addNotAvailableTime, updateNotAvailableTime, deleteNotAvailableTime } = useNotAvailableTimeContext();
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [editTimeId, setEditTimeId] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [timeToDelete, setTimeToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [disabledTimeSlots, setDisabledTimeSlots] = useState([]); // New state for disabled time slots
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTimeId, setEditingTimeId] = useState(null);

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
        if (!selectedIntervals.length || !selectedDate || !staffId) return;

        // Get the selected date in UTC format
        const formattedDate = moment(selectedDate).tz('UTC').toISOString();

        // Combine the selected date with the "From" and "To" times, converting to UTC
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
            reason: 'Meeting',
        };

        try {
            if (editTimeId) {
                await updateNotAvailableTime(businessId, staffId, editTimeId, notAvailableTimeData);
                setAlert({ message: 'Not available time updated successfully!', severity: 'success' });
            } else {
                await addNotAvailableTime(businessId, staffId, notAvailableTimeData);
                setAlert({ message: 'Not available time added successfully!', severity: 'success' });
            }
            setIsFormOpen(false);
            setEditTimeId(null);
            setEditingTimeId(null);
            setSelectedDate(null);
            setSelectedIntervals([]);
        } catch (error) {
            setAlert({ message: editTimeId ? 'Failed to update not available time.' : 'Failed to add not available time.', severity: 'error' });
        }
    };

    const handleDeleteNotAvailableTime = async () => {
        if (!timeToDelete) return;
        try {
            await deleteNotAvailableTime(businessId, staffId, timeToDelete);
            setAlert({ message: 'Not available time deleted successfully!', severity: 'success' });
        } catch (error) {
            setAlert({ message: 'Failed to delete not available time.', severity: 'error' });
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
                {'Manage Not Available Times'}
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
                        <Add sx={{ fontSize: '40px' }} /> {'Add new not available time'}
                    </Typography>
                </Box>

                <Collapse in={isFormOpen}>
                    <Box sx={gridBasedTimePickerWrapperStyle}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <StyledDatePicker
                                label="Select Date"
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

                        <Box sx={formActionButtonsStyle}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddOrUpdateNotAvailableTime}
                                sx={addOrUpdateButtonStyle}
                            >
                                {editTimeId ? 'Update' : 'Add'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setIsFormOpen(false)}
                                sx={cancelButtonStyle}
                            >
                                Cancel
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
                                                            From: {moment(time.from).local().format('HH:mm')}
                                                        </Typography>
                                                        <Typography variant="body2" component="div">
                                                            To: {moment(time.to).local().format('HH:mm')}
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
                                                        label="Select Date"
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

                                                <Box sx={formActionButtonsStyle}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleAddOrUpdateNotAvailableTime}
                                                        sx={addOrUpdateButtonStyle}
                                                    >
                                                        {editTimeId ? 'Update' : 'Add'}
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
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Collapse>
                                    </React.Fragment>
                                ))
                        ) : (
                            <Typography variant="body2">No not available times</Typography>
                        )}
                    </List>
                </Box>
            </DialogContent>

            <ConfirmationDialog
                open={confirmDialogOpen}
                title={'Confirm Delete'}
                content={'Are you sure you want to delete this not available time?'}
                onConfirm={handleDeleteNotAvailableTime}
                onCancel={() => setConfirmDialogOpen(false)}
            />
        </Dialog>
    );
};

export default NotAvailableTimeDialog;
           