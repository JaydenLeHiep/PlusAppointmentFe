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
import { useTranslation } from 'react-i18next';
import { useCustomersContext } from '../../../context/CustomerContext.js';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import CustomerList from './CustomerList.js';
import CustomerForm from './CustomerForm';
import { dialogTitleStyles, addNewCustomerTypographyStyles, alertStyles, closeIconButtonStyles } from '../../../styles/OwnerStyle/CustomerComponent/ShowCustomerDialogStyles';

const ShowCustomerDialog = ({ open, onClose, businessId, customers }) => {
  const { t } = useTranslation('showCustomerDialog');
  const { fetchCustomersForBusiness, addNewCustomer, updateExistingCustomer, deleteExistingCustomer } = useCustomersContext();

  const [editCustomerId, setEditCustomerId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const alertRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (open && !customers.length) {
      fetchCustomersForBusiness(businessId);
    }
  }, [open, fetchCustomersForBusiness, businessId, customers]);

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
    setEditCustomerId(null);
    setTimeout(() => {
      action();
      setTimeout(() => setEditCustomerId(null), 300);
    }, 300);
  };

  const handleAddCustomer = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const customerDetails = {
          name: newCustomer.name,
          email: newCustomer.email,
          phone: newCustomer.phone,
          BusinessId: String(businessId),
        };

        await addNewCustomer(customerDetails, businessId);
        setAlert({ message: t('customerAddedSuccess'), severity: 'success' });

        setNewCustomer({
          name: '',
          email: '',
          phone: '',
        });
      } catch (error) {
        console.error('Failed to add customer:', error);
        const errorMessage = error.response?.data?.message || error.message || t('customerAddedError');
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleUpdateCustomer = (customerId) => {
    closeFormAndExecuteAction(async () => {
      try {
        const customerDetails = {
          name: newCustomer.name,
          email: newCustomer.email,
          phone: newCustomer.phone,
          BusinessId: String(businessId),
        };

        await updateExistingCustomer(businessId, customerId, customerDetails);
        setAlert({ message: t('customerUpdatedSuccess'), severity: 'success' });

        setNewCustomer({
          name: '',
          email: '',
          phone: '',
        });
      } catch (error) {
        console.error('Failed to update customer:', error);
        const errorMessage = error.response?.data?.message || error.message || t('customerUpdatedError');
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const confirmDeleteCustomer = (customerId) => {
    setCustomerToDelete(customerId);
    setConfirmDialogOpen(true);
  };

  const handleDeleteCustomer = () => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteExistingCustomer(businessId, customerToDelete);
        setAlert({ message: t('customerDeletedSuccess'), severity: 'success' });
      } catch (error) {
        console.error('Failed to delete customer:', error);
        const errorMessage = error.response?.data?.message || error.message || t('customerDeletedError');
        setAlert({ message: errorMessage, severity: 'error' });
      } finally {
        setConfirmDialogOpen(false);
        setCustomerToDelete(null);
      }
    });
  };

  const handleEditCustomer = (customer) => {
    setEditCustomerId(customer.customerId);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setIsFormOpen(false);
  };

  const handleAddNewCustomerClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
    });
    setEditCustomerId(null);
    setAlert({ message: '', severity: '' });

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditCustomerId(null);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
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
        <DialogTitle sx={dialogTitleStyles}>
          {t('customerListTitle')}
          <IconButton aria-label="close" onClick={onClose} sx={closeIconButtonStyles}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            ref={alertRef}
            sx={alertStyles}
          >
            {alert.message}
          </Alert>
        )}
        <DialogContent dividers>
          <Box mt={1} mb={3} display="flex" justifyContent="center">
            <Typography
              variant="h7"
              onClick={handleAddNewCustomerClick}
              sx={addNewCustomerTypographyStyles}
            >
              <Add sx={{ fontSize: '40px' }} /> {t('addNewCustomer')}
            </Typography>
          </Box>
          <Collapse in={isFormOpen}>
            <CustomerForm
              title={t('addNewCustomer')}
              customer={newCustomer}
              setCustomer={setNewCustomer}
              handleAction={handleAddCustomer}
              handleCancelForm={handleCancelForm}
              buttonText={t('addCustomer')}
              buttonColor="#007bff"
            />
          </Collapse>
          <CustomerList
            customers={customers}
            editCustomerId={editCustomerId}
            handleEditCustomer={handleEditCustomer}
            confirmDeleteCustomer={confirmDeleteCustomer}
            newCustomer={newCustomer}
            setCustomer={setNewCustomer}
            handleUpdateCustomer={handleUpdateCustomer}
            handleCancelForm={handleCancelForm}
          />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={confirmDialogOpen}
        title={t('confirmDeleteTitle')}
        content={t('confirmDeleteContent')}
        onConfirm={handleDeleteCustomer}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default ShowCustomerDialog;