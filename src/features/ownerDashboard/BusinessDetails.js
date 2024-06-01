// src/features/ownerDashboard/BusinessDetails.js

import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Delete } from '@mui/icons-material';

const BusinessDetails = ({ selectedBusiness, handleBackToList }) => {
  const [events, setEvents] = useState(selectedBusiness.appointments?.$values || []);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    start: '',
    end: '',
  });

  const handleDateClick = (info) => {
    const dateEvents = events.filter(event => new Date(event.start).toDateString() === new Date(info.dateStr).toDateString());
    setSelectedDate(info.dateStr);
    setSelectedDateEvents(dateEvents);
    setOpen(true);
  };

  const handleEventClick = (info) => {
    const dateEvents = events.filter(event => new Date(event.start).toDateString() === new Date(info.event.start).toDateString());
    setSelectedDate(new Date(info.event.start).toDateString());
    setSelectedDateEvents(dateEvents);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
    setSelectedDateEvents([]);
    setNewAppointment({
      title: '',
      start: '',
      end: '',
    });
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedDateEvents(selectedDateEvents.filter(event => event.id !== eventId));
  };

  const handleAddAppointment = () => {
    const newEvent = {
      id: new Date().getTime(),
      title: newAppointment.title,
      start: new Date(`${selectedDate}T${newAppointment.start}`).toISOString(),
      end: new Date(`${selectedDate}T${newAppointment.end}`).toISOString(),
    };
    setEvents([...events, newEvent]);
    setSelectedDateEvents([...selectedDateEvents, newEvent]);
    setNewAppointment({
      title: '',
      start: '',
      end: '',
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom className="text-center">
        {selectedBusiness.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Address:</strong> {selectedBusiness.address}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Phone:</strong> {selectedBusiness.phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Email:</strong> {selectedBusiness.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Staffs:</strong> {selectedBusiness.staffs?.$values?.length || selectedBusiness.staffs?.length || 0}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Appointments:</strong> {selectedBusiness.appointments?.$values?.length || selectedBusiness.appointments?.length || 0}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Services:</strong> {selectedBusiness.services?.$values?.length || selectedBusiness.services?.length || 0}
      </Typography>
      <Box className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleBackToList} style={{ marginTop: '10px' }}>
        Back to list
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointments for {selectedDate}</DialogTitle>
        <DialogContent>
          {selectedDateEvents.length > 0 ? (
            <List>
              {selectedDateEvents.map(event => (
                <ListItem key={event.id} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(event.id)}>
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText
                    primary={event.title}
                    secondary={`${new Date(event.start).toLocaleTimeString()} - ${new Date(event.end).toLocaleTimeString()}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <DialogContentText>No appointments for this date.</DialogContentText>
          )}
          <DialogContentText>Add New Appointment</DialogContentText>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={newAppointment.title}
            onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Start Time"
            type="time"
            fullWidth
            value={newAppointment.start}
            onChange={(e) => setNewAppointment({ ...newAppointment, start: e.target.value })}
          />
          <TextField
            margin="dense"
            label="End Time"
            type="time"
            fullWidth
            value={newAppointment.end}
            onChange={(e) => setNewAppointment({ ...newAppointment, end: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddAppointment} color="primary">Add Appointment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessDetails;
