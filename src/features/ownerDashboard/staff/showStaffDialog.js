import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  Collapse,
} from '@mui/material';
import { Add, Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useStaffsContext } from '../../../context/StaffsContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import StaffList from './StaffList';
import StaffForm from './StaffForm';
import CalendarDialog from './CalendarDialog';
import NotAvailableTimeDialog from './NotAvailableTimeDialog';

import {
  DialogTitleStyled,
  CloseIconButtonStyled,
  AlertStyled,
  AddNewStaffTypographyStyled,
  BoxStyled,
} from '../../../styles/OwnerStyle/StaffComPonent/showStaffDialogStyles';

const ShowStaffDialog = ({ open, onClose, businessId, notAvailableDates, notAvailableTimes, openingHours }) => {
  const { t } = useTranslation('showStaffDialog');
  const { staff, addStaff, updateStaff, deleteStaff } = useStaffsContext();

  const [editStaffId, setEditStaffId] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [selectedStaffName, setSelectedStaffName] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const [notAvailableTimeOpen, setNotAvailableTimeOpen] = useState(false);

  const alertRef = useRef(null);
  const formRef = useRef(null);

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

  const handleCalendarIconClick = (staffId) => {
    const selectedStaff = staff.find((staffMember) => staffMember.staffId === staffId);
    const staffName = selectedStaff ? selectedStaff.name : '';
    setSelectedStaffId(staffId);
    setSelectedStaffName(staffName);
    setCalendarOpen(true);
  };

  const handleClockIconClick = (staffId) => {
    const selectedStaff = staff.find((staffMember) => staffMember.staffId === staffId);
    const staffName = selectedStaff ? selectedStaff.name : '';
    setSelectedStaffId(staffId);
    setSelectedStaffName(staffName);
    setNotAvailableTimeOpen(true);
  };

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
          password: newStaff.password
        };

        await addStaff(String(businessId), staffDetails);
        setAlert({ message: t('staffAddedSuccess'), severity: 'success' });

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: '',
        });
      } catch (error) {
        console.error('Failed to add staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffAddedError');
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
          password: newStaff.password
        };

        await updateStaff(String(businessId), staffId, staffDetails);
        setAlert({ message: t('staffUpdatedSuccess'), severity: 'success' });

        setNewStaff({
          name: '',
          email: '',
          phone: '',
          password: '',
        });
      } catch (error) {
        console.error('Failed to update staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffUpdatedError');
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
        setAlert({ message: t('staffDeletedSuccess'), severity: 'success' });
      } catch (error) {
        console.error('Failed to delete staff:', error);
        const errorMessage = error.response?.data?.message || error.message || t('staffDeletedError');
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
      password: '',
    });
    setIsFormOpen(false);
  };

  const handleAddNewStaffClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      password: '',
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
      password: '',
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
        <DialogTitleStyled>
          {t('staffListTitle')}
          <CloseIconButtonStyled aria-label="close" onClick={onClose}>
            <CloseIcon />
          </CloseIconButtonStyled>
        </DialogTitleStyled>
        {alert.message && (
          <AlertStyled
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            ref={alertRef}
          >
            {alert.message}
          </AlertStyled>
        )}
        <DialogContent dividers>
          <BoxStyled>
            <AddNewStaffTypographyStyled
              variant="h7"
              onClick={handleAddNewStaffClick}
            >
              <Add sx={{ fontSize: '40px' }} /> {t('addNewStaff')}
            </AddNewStaffTypographyStyled>
          </BoxStyled>
          <Collapse in={isFormOpen}>
            <StaffForm
              title={t('addNewStaff')}
              newStaff={newStaff}
              setNewStaff={setNewStaff}
              handleAction={handleAddStaff}
              handleCancelForm={handleCancelForm}
              buttonText={t('addStaff')}
              buttonColor="#007bff"
              mode="create"
            />
          </Collapse>
          <StaffList
            staff={staff}
            editStaffId={editStaffId}
            handleEditStaff={handleEditStaff}
            confirmDeleteStaff={confirmDeleteStaff}
            newStaff={newStaff}
            setNewStaff={setNewStaff}
            handleCancelForm={handleCancelForm}
            handleUpdateStaff={handleUpdateStaff}
            handleCalendarIconClick={handleCalendarIconClick}
            handleClockIconClick={handleClockIconClick}
          />
        </DialogContent>
      </Dialog>

      {/* CalendarDialog Component for managing not available dates */}
      <CalendarDialog
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        businessId={businessId}
        staffId={selectedStaffId}
        notAvailableDates={notAvailableDates}
        staffName={selectedStaffName}
      />

      <NotAvailableTimeDialog
        open={notAvailableTimeOpen}
        onClose={() => setNotAvailableTimeOpen(false)}
        notAvailableTimes={notAvailableTimes}
        notAvailableDates={notAvailableDates}
        staffName={selectedStaffName}
        staffId={selectedStaffId}
        businessId={businessId}
        openingHours={openingHours}
      />

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