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
import { useServicesContext } from '../../../context/ServicesContext';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';

const ShowServicesDialog = ({ open, onClose, businessId }) => {
  const { t } = useTranslation('showServicesDialog'); // Use the 'showServicesDialog' namespace
  const { services, addService, updateService, deleteService } = useServicesContext();

  const [editServiceId, setEditServiceId] = useState(null); // Track which service is being edited
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '00:30', // Default to 30 minutes
    price: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null); // For tracking the service to be deleted

  const alertRef = useRef(null); // Ref for alert message
  const formRef = useRef(null); // Ref for expanding form

  useEffect(() => {
    if (alert.message) {
      if (alertRef.current) {
        alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const timer = setTimeout(() => {
        setAlert({ message: '', severity: '' });
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const closeFormAndExecuteAction = async (action) => {
    setIsFormOpen(false);
    setEditServiceId(null);
    setTimeout(() => {
      action();
    }, 300);
  };

  const handleAddService = () => {
    closeFormAndExecuteAction(async () => {
      try {
        const serviceDetails = {
          ...newService,
          BusinessId: String(businessId),
          duration: newService.duration + ':00'
        };

        await addService(String(businessId), serviceDetails);
        setAlert({ message: t('serviceAddedSuccess'), severity: 'success' });

        setNewService({
          name: '',
          description: '',
          duration: '00:30',
          price: ''
        });
      } catch (error) {
        console.error('Failed to add service:', error);
        const errorMessage = error.response?.data?.message || error.message || t('serviceAddedError');
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const handleUpdateService = (serviceId) => {
    closeFormAndExecuteAction(async () => {
      try {
        const serviceDetails = {
          ...newService,
          duration: newService.duration + ':00',
          BusinessId: String(businessId)
        };

        await updateService(String(businessId), serviceId, serviceDetails);
        setAlert({ message: t('serviceUpdatedSuccess'), severity: 'success' });

        setNewService({
          name: '',
          description: '',
          duration: '00:30',
          price: ''
        });
      } catch (error) {
        console.error('Failed to update service:', error);
        const errorMessage = error.response?.data?.message || error.message || t('serviceUpdatedError');
        setAlert({ message: errorMessage, severity: 'error' });
      }
    });
  };

  const confirmDeleteService = (serviceId) => {
    setServiceToDelete(serviceId); // Set the service to be deleted
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleDeleteService = () => {
    closeFormAndExecuteAction(async () => {
      try {
        await deleteService(String(businessId), serviceToDelete);
        setAlert({ message: t('serviceDeletedSuccess'), severity: 'success' });
      } catch (error) {
        console.error('Failed to delete service:', error);
        const errorMessage = error.response?.data?.message || error.message || t('serviceDeletedError');
        setAlert({ message: errorMessage, severity: 'error' });
      } finally {
        setConfirmDialogOpen(false); // Close the confirmation dialog after deletion
        setServiceToDelete(null); // Clear the serviceToDelete state
      }
    });
  };

  const handleEditService = (service) => {
    setEditServiceId(service.serviceId);
    setNewService({
      name: service.name,
      description: service.description,
      duration: service.duration.substring(0, 5),
      price: service.price
    });
  };

  const handleAddNewServiceClick = () => {
    setIsFormOpen(!isFormOpen);
    setNewService({
      name: '',
      description: '',
      duration: '00:30',
      price: ''
    });
    setEditServiceId(null); // Close the edit form if add form is opened
    setAlert({ message: '', severity: '' });

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300); // Adjust delay to match animation time
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditServiceId(null);
    setNewService({
      name: '',
      description: '',
      duration: '00:30',
      price: ''
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
          {t('serviceListTitle')}
          <IconButton aria-label="close" onClick={onClose} sx={{ color: '#808080', fontSize: '1.5rem' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: '', severity: '' })}
            ref={alertRef} // Reference for scrolling to the alert message
            sx={{ mt: 2 }}
          >
            {alert.message}
          </Alert>
        )}
        <DialogContent dividers>
          <Box mt={1} mb={3} display="flex" justifyContent="center">
            <Typography
              variant="h7"
              onClick={handleAddNewServiceClick}
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
              <Add sx={{ fontSize: '40px' }} /> {t('addNewService')}
            </Typography>
          </Box>
          <Collapse in={isFormOpen}>
            <ServiceForm
              title={t('addNewService')}
              newService={newService}
              setNewService={setNewService}
              handleAction={handleAddService}
              handleCancelForm={handleCancelForm}
              buttonText={t('addNewService')}
              buttonColor="#007bff"
            />
          </Collapse>
          <ServiceList
            services={services}
            editServiceId={editServiceId}
            handleEditService={handleEditService}
            confirmDeleteService={confirmDeleteService}
            newService={newService}
            setNewService={setNewService}
            handleUpdateService={handleUpdateService}
            handleCancelForm={handleCancelForm}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Deleting Service */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title={t('confirmDeleteTitle')}
        content={t('confirmDeleteContent')}
        onConfirm={handleDeleteService}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default ShowServicesDialog;
