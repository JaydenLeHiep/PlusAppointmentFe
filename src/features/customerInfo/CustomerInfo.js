import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
    RootContainer,
    StyledTableContainer,
    StyledTable,
} from '../../styles/CustomersInfo/CustomerInfoStyles';
import {
    TableBody, TableCell, TableHead, TableRow, IconButton, Typography, TextField, Box, Alert, Collapse, Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useCustomersContext } from '../../context/CustomerContext';
import { LoadingButton } from '@mui/lab'; // Import LoadingButton from MUI Lab
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';
import BulkEmailModal from './BulkEmailModal';
import { sendBulkEmail } from '../../lib/apiClientSendingEmailsCustomer';

const CustomerInfo = ({ businessId, customers }) => {
    const { t } = useTranslation('customerInfo');
    const { checkIns, fetchCheckInDetailsForBusiness } = useCustomersContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [editCustomerData, setEditCustomerData] = useState({ name: '', email: '', phone: '' });
    const [alert, setAlert] = useState({ message: '', severity: '' });
    const [customersData, setCustomersData] = useState([]);
    const [loadingCheckIns, setLoadingCheckIns] = useState(false);
    const [isBulkEmailModalOpen, setIsBulkEmailModalOpen] = useState(false);
    const formRef = useRef(null);

    // Memoize extracted check-in data from response
    const extractedCheckIns = useMemo(() => (checkIns && checkIns.$values ? checkIns.$values : []), [checkIns]);

    // Fetch check-in details for the business when the component mounts
    useEffect(() => {
        if (businessId) {
            fetchCheckInDetailsForBusiness(businessId);
        }
    }, [businessId, fetchCheckInDetailsForBusiness]);

    // Calculate total bookings and last booking date for each customer
    const getBookingInfo = useCallback((customerId) => {
        const customerCheckIns = extractedCheckIns.filter((checkIn) => checkIn.customerId === customerId);
        const totalBookings = customerCheckIns.length;

        let lastBooking = t('noBookings');
        if (customerCheckIns.length > 0) {
            const latestCheckInTime = new Date(Math.max(...customerCheckIns.map((checkIn) => new Date(checkIn.checkInTime))));
            const formattedDate = latestCheckInTime.toLocaleDateString('en-GB'); // Formats as dd/MM/yyyy
            const formattedTime = latestCheckInTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Formats as HH:mm
            lastBooking = `${formattedDate}, ${formattedTime}`;
        }

        return { totalBookings, lastBooking };
    }, [extractedCheckIns, t]);

    // Initialize customers data with booking info when customers or check-ins change
    useEffect(() => {
        const initializeCustomersData = customers.map(customer => {
            const { totalBookings, lastBooking } = getBookingInfo(customer.customerId);
            return {
                ...customer,
                totalBookings,
                lastBooking,
            };
        });
        setCustomersData(initializeCustomersData);
    }, [customers, getBookingInfo]);

    const handleEditCustomer = (customer) => {
        setEditCustomerId(customer.customerId);
        setEditCustomerData({ name: customer.name, email: customer.email, phone: customer.phone });
    };

    const handleUpdateCustomer = async (customerId) => {
        try {
            setAlert({ message: t('customerUpdatedSuccess'), severity: 'success' });
            setEditCustomerId(null);
        } catch (err) {
            setAlert({ message: err.message || t('customerUpdateError'), severity: 'error' });
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            setAlert({ message: t('customerDeletedSuccess'), severity: 'success' });
        } catch (err) {
            setAlert({ message: err.message || t('customerDeleteError'), severity: 'error' });
        }
    };

    const handleSendEmail = () => {
        setIsBulkEmailModalOpen(true);
    };

    const handleCloseBulkEmailModal = () => {
        setIsBulkEmailModalOpen(false);
    };

    const handleSendBulkEmail = async (bulkEmail) => {
        try {
            await sendBulkEmail(bulkEmail);
            setAlert({ message: t('emailSentSuccess'), severity: 'success' });
        } catch (err) {
            setAlert({ message: err.message || t('emailSendError'), severity: 'error' });
        }
    };

    const handleAddNewCustomer = () => {
        console.log('Add new customer clicked');
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

    // Filter customers based on search query
    const filteredCustomers = Array.isArray(customersData) ? customersData.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    ) : [];
    
    return (
        <RootContainer>
            {/* Search Bar and Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label={t('searchCustomer')}
                    margin="dense"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: '44.5%' }}
                />
                <Box display="flex" justifyContent="flex-start" alignItems="center" sx={{ mr: 2 }}>
                    <LoadingButton
                        onClick={handleLoadCheckIns}
                        loading={loadingCheckIns}
                        variant="contained"
                        sx={{
                            minWidth: 40,
                            mr: 2,
                            color: 'black',
                            backgroundColor: 'white',
                            '&:hover': {
                                backgroundColor: '#f0f0f0', // Slightly gray to show a hover effect
                            },
                        }}
                        startIcon={!loadingCheckIns && <RefreshIcon />}
                        loadingIndicator={<CircularProgress size={20} style={{ color: 'black' }} />} // Custom loading indicator
                    >
                        {/* No text inside the button */}
                    </LoadingButton>
                    <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mr: 2 }}>
                        {t('sendEmail')}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleAddNewCustomer}>
                        {t('addCustomer')}
                    </Button>
                </Box>
            </Box>
            {filteredCustomers.length === 0 ? (
                <Typography>{t('noCustomersFound')}</Typography>
            ) : (
                <StyledTableContainer>
                    <StyledTable stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc' }}>{t('information')}</TableCell>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('birthday')}</TableCell>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('promotion')}</TableCell>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('bookings')}</TableCell>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('lastBooking')}</TableCell>
                                <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>{t('edit')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.customerId}>
                                    <TableCell sx={{ width: '30%' }} style={{ border: '1px solid #ccc' }}>
                                        <Typography variant="body1" fontWeight="bold">{customer.name}</Typography>
                                        <Typography variant="body2">{customer.email}</Typography>
                                        <Typography variant="body2">{customer.phone}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ width: '20%' }} align="center" style={{ border: '1px solid #ccc' }}>
                                        {customer.birthday ? new Date(customer.birthday).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : t('unknown')}
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center" style={{ border: '1px solid #ccc' }}>
                                        {customer.wantsPromotion ? t('yes') : t('no')}
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.totalBookings || 0}</TableCell>
                                    <TableCell sx={{ width: '20%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.lastBooking || t('noBookings')}</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center" style={{ border: '1px solid #ccc' }}>
                                        <IconButton onClick={() => handleEditCustomer(customer)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteCustomer(customer.customerId)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>

                                    {/* Edit form for the selected customer */}
                                    {editCustomerId === customer.customerId && (
                                        <TableRow>
                                            <TableCell colSpan={6} style={{ border: '1px solid #ccc' }}>
                                                <Collapse in={editCustomerId === customer.customerId}>
                                                    <Box ref={formRef} mt={2}>
                                                        <TextField
                                                            label={t('customerName')}
                                                            fullWidth
                                                            margin="dense"
                                                            value={editCustomerData.name}
                                                            onChange={(e) =>
                                                                setEditCustomerData({ ...editCustomerData, name: e.target.value })
                                                            }
                                                        />
                                                        <TextField
                                                            label={t('customerEmail')}
                                                            fullWidth
                                                            margin="dense"
                                                            value={editCustomerData.email}
                                                            onChange={(e) =>
                                                                setEditCustomerData({ ...editCustomerData, email: e.target.value })
                                                            }
                                                        />
                                                        <TextField
                                                            label={t('customerPhone')}
                                                            fullWidth
                                                            margin="dense"
                                                            value={editCustomerData.phone}
                                                            onChange={(e) =>
                                                                setEditCustomerData({ ...editCustomerData, phone: e.target.value })
                                                            }
                                                        />
                                                        <Box display="flex" justifyContent="flex-end" mt={2}>
                                                            <IconButton onClick={() => handleUpdateCustomer(customer.customerId)} color="primary">
                                                                {t('save')}
                                                            </IconButton>
                                                            <IconButton onClick={() => setEditCustomerId(null)} color="secondary">
                                                                {t('cancel')}
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                </StyledTableContainer>
            )}
            <BulkEmailModal
                open={isBulkEmailModalOpen}
                onClose={handleCloseBulkEmailModal}
                customers={customers.filter((customer) => customer.wantsPromotion)}
                onSendEmail={handleSendBulkEmail}
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
