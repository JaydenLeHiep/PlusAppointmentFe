import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RootContainer } from '../../styles/CustomersInfo/CustomerInfoStyles';
import { Alert, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCustomersContext } from '../../context/CustomerContext';
import BulkEmailModal from './BulkEmailModal';
import SearchBar from './SearchBar';
import CustomerTable from './CustomerTable';
import CustomerFormModal from './CustomerFormModal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { sendBulkEmail } from '../../lib/apiClientSendingEmailsCustomer';
import moment from 'moment-timezone';

const CustomerInfo = ({ businessId, customers, businessName }) => {
  const { t } = useTranslation('customerInfo');
  const { checkIns, fetchCheckInDetailsForBusiness, addNewCustomer, updateExistingCustomer, deleteExistingCustomer, applyDiscountCode } = useCustomersContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [editCustomerData, setEditCustomerData] = useState({ name: '', email: '', phone: '', birthday: null, wantsPromotion: false, note: '' });
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [customersData, setCustomersData] = useState([]);
  const [loadingCheckIns, setLoadingCheckIns] = useState(false);
  const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const extractedCheckIns = useMemo(() => (checkIns && checkIns.$values ? checkIns.$values : []), [checkIns]);

  useEffect(() => {
    if (businessId) fetchCheckInDetailsForBusiness(businessId);
  }, [businessId, fetchCheckInDetailsForBusiness]);

  const getBookingInfo = useCallback((customerId) => {
    const customerCheckIns = extractedCheckIns.filter((checkIn) => checkIn.customerId === customerId);
    const totalBookings = customerCheckIns.length;
    const lastBooking = customerCheckIns.length > 0 ?
      new Date(Math.max(...customerCheckIns.map((checkIn) => new Date(checkIn.checkInTime)))).toLocaleString('en-GB') : t('noBookings');
    return { totalBookings, lastBooking };
  }, [extractedCheckIns, t]);

  useEffect(() => {
    const initializeCustomersData = customers.map(customer => ({
      ...customer,
      ...getBookingInfo(customer.customerId),
    }));
    setCustomersData(initializeCustomersData);
  }, [customers, getBookingInfo]);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: '', severity: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleEditCustomer = (customer) => {
    setEditCustomerId(customer.customerId);
    setEditCustomerData({ ...customer, birthday: customer.birthday ? moment(customer.birthday) : null, note: customer.note || '' });
    setIsFormModalOpen(true);
  };

  const handleAddNewCustomer = () => {
    setEditCustomerId(null);
    setEditCustomerData({ name: '', email: '', phone: '', birthday: null, wantsPromotion: false, note: '' });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async () => {
    const customerDetails = { ...editCustomerData, BusinessId: String(businessId) };
    try {
      if (editCustomerId) {
        await updateExistingCustomer(businessId, editCustomerId, customerDetails);
        setAlert({ message: t('customerUpdatedSuccess'), severity: 'success' });
      } else {
        await addNewCustomer(businessId, customerDetails);
        setAlert({ message: t('customerAddedSuccess'), severity: 'success' });
      }
    } catch (error) {
      setAlert({ message: error.message || t('operationError'), severity: 'error' });
    } finally {
      setIsFormModalOpen(false);
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await deleteExistingCustomer(businessId, customerToDelete);
      setAlert({ message: t('customerDeletedSuccess'), severity: 'success' });
    } catch (err) {
      setAlert({ message: err.message || t('customerDeleteError'), severity: 'error' });
    } finally {
      setConfirmDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleDateChange = (date) => {
    if (moment.isMoment(date) && date.isValid()) {
      const utcDate = moment.utc(date.format('YYYY-MM-DD')).startOf('day');
      setEditCustomerData({ ...editCustomerData, birthday: utcDate });
    } else {
      setEditCustomerData({ ...editCustomerData, birthday: null });
    }
  };

  const handleLoadCheckIns = async () => {
    if (businessId) {
      setLoadingCheckIns(true);
      try {
        await fetchCheckInDetailsForBusiness(businessId);
      } catch (error) {
        console.error('Error loading check-ins:', error);
      } finally {
        setLoadingCheckIns(false);
      }
    }
  };

  const handleSendEmail = () => {
    setIsBulkEmailModalOpen(true);
  };

  const handleSendBulkEmail = async (bulkEmail) => {
    try {
      await sendBulkEmail(bulkEmail);
      setAlert({ message: t('emailSentSuccess'), severity: 'success' });
    } catch (err) {
      setAlert({ message: err.message || t('emailSendError'), severity: 'error' });
    }
  };

  // Filter customers based on search query
  const filteredCustomers = Array.isArray(customersData) ? customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  ) : [];

  const handleDiscountCodeVerification = async (code) => {
    try {
      const response = await applyDiscountCode({ Code: code });
      const successMessage = t('discountCodeAppliedSuccess');
      
      return {
        success: true,
        message: successMessage,
        discountPercentage: response.discountPercentage || null, 
      };
    } catch (error) {
      const errorMessage = t('discountCodeAppliedFailed');
      return { success: false, message: errorMessage };
    }
  };

  return (
    <RootContainer>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loadingCheckIns={loadingCheckIns}
        handleLoadCheckIns={handleLoadCheckIns}
        handleSendEmail={handleSendEmail}
        handleAddNewCustomer={handleAddNewCustomer}
        handleDiscountCodeVerification={handleDiscountCodeVerification}
      />
      {filteredCustomers.length === 0 ? (
        <Typography>{t('noCustomersFound')}</Typography>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          handleEditCustomer={handleEditCustomer}
          confirmDeleteCustomer={(id) => {
            setCustomerToDelete(id);
            setConfirmDialogOpen(true);
          }}
        />
      )}
      <CustomerFormModal
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
        editCustomerData={editCustomerData}
        setEditCustomerData={setEditCustomerData}
        handleFormSubmit={handleFormSubmit}
        editCustomerId={editCustomerId}
        handleDateChange={handleDateChange}
      />
      <BulkEmailModal
        open={isBulkEmailModalOpen}
        onClose={() => setIsBulkEmailModalOpen(false)}
        customers={filteredCustomers.filter((customer) => customer.wantsPromotion)}
        onSendEmail={handleSendBulkEmail}
        businessName={businessName}
      />
      <ConfirmationDialog
        open={confirmDialogOpen}
        title={t('confirmDeleteTitle')}
        content={t('confirmDeleteContent')}
        onConfirm={handleDeleteCustomer}
        onCancel={() => setConfirmDialogOpen(false)}
      />
      {alert.message && (
        <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
          {alert.message}
        </Alert>
      )}
    </RootContainer>
  );
};

export default CustomerInfo;