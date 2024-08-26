import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Collapse,
  Alert,
} from '@mui/material';
import { Add, Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import { useStaffsContext } from '../../../context/StaffsContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import StaffList from './StaffList';
import StaffForm from './StaffForm';

const ShowStaffDialog = ({ open, onClose, businessId }) => {
  const { t } = useTranslation('showStaffDialog'); // Use the 'showStaffDialog' namespace

  const { staff, fetchAllStaff, addStaff, updateStaff, deleteStaff } = useStaffsContext();

  const [editStaffId, setEditStaffId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const alertRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (open && staff.length === 0) {
      fetchAllStaff(String(businessId));
    }
  }, [open, fetchAllStaff, businessId, staff.length]);

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

  const closeFormAndExecuteAction = async (action) => {
    setIsFormOpen(false);
    setEditStaffId(null);
    setTimeout(() => {
      action();
      setTimeout(() => setEditStaffId(null), 300);
    }, 300);
  };

  const handleAddStaff = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const staffDetails = {
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          password: newStaff.password,
          BusinessId: String(businessId)
        };

        await addStaff(String(businessId), staffDetails);
        setAlert({ message: t('staffAddedSuccess'), severity: 'success' }); // Use translation for success message

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } catch (error) {
        console.error('Failed to add staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffAddedError'); // Use translation for error message
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleUpdateStaff = (staffId) => {
    closeFormAndExecuteAction(async () => {
      try {
        const staffDetails = {
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          password: newStaff.password,
          BusinessId: String(businessId)
        };

        await updateStaff(String(businessId), staffId, staffDetails);
        setAlert({ message: t('staffUpdatedSuccess'), severity: 'success' }); // Use translation for success message

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: ''
        });
      } catch (error) {
        console.error('Failed to update staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffUpdatedError'); // Use translation for error message
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const confirmDeleteStaff = (staffId) => {
    setStaffToDelete(staffId);
    setConfirmDialogOpen(true);
  };

  const handleDeleteStaff = () => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteStaff(String(businessId), staffToDelete);
        setAlert({ message: t('staffDeletedSuccess'), severity: 'success' }); // Use translation for success message
      } catch (error) {
        console.error('Failed to delete staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffDeletedError'); // Use translation for error message
        setAlert({ message: errorMessage, severity: 'error' });
      } finally {
        setConfirmDialogOpen(false);
        setStaffToDelete(null);
      }
    });
  };

  const handleEditStaff = (staff) => {
    setEditStaffId(staff.staffId);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      password: ''
    });
    setIsFormOpen(false);
  };

  const handleAddNewStaffClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    setEditStaffId(null);
    setAlert({ message: '', severity: '' });

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditStaffId(null);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
  };

  const handleCloseDialog = () => {
    setAlert({ message: '', severity: '' });
    handleCancelForm();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            fontWeight: '550',
            fontSize: '1.75rem',
            color: '#1a1a1a',
            textAlign: 'center',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: '3px'
          }}
        >
          {t('staffListTitle')}
          <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            ref={alertRef}
            sx={{ mt: 2 }}
          >
            {alert.message}
          </Alert>
        )}
        <DialogContent dividers>
          <Box mt={1} mb={3} display="flex" justifyContent="center">
            <Typography
              variant="h7"
              onClick={handleAddNewStaffClick}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: '#1976d2',
                '&:hover': {
                  color: '#115293',
                },
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Add sx={{ fontSize: '40px' }} /> {t('addNewStaff')}
            </Typography>
          </Box>
          <Collapse in={isFormOpen}>
            <StaffForm
              title={t('addNewStaff')}
              newStaff={newStaff}
              setNewStaff={setNewStaff}
              handleAction={handleAddStaff}
              handleCancelForm={handleCancelForm}
              buttonText={t('addStaff')}
              buttonColor="#007bff"
            />
          </Collapse>
          <StaffList
            staff={staff}
            editStaffId={editStaffId}
            handleEditStaff={handleEditStaff}
            confirmDeleteStaff={confirmDeleteStaff}
            newStaff={newStaff}
            setNewStaff={setNewStaff}
            handleUpdateStaff={handleUpdateStaff}
            handleCancelForm={handleCancelForm}
          />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={confirmDialogOpen}
        title={t('confirmDeleteTitle')}
        content={t('confirmDeleteContent')}
        onConfirm={handleDeleteStaff}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default ShowStaffDialog;