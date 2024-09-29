import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { StyledTextField, CustomButton, FormContainer, BoldTypography, StyledAlert, StyledSnackbar } from '../../../styles/CustomerStyle/DeleteCustomerStyles/DeleteAppointmentCustomerStyles';
import { useTranslation } from 'react-i18next';
import CustomerBusinessInfo from '../CustomerBusinessInfo';
import { fetchBusinessesByName } from '../../../lib/apiClientBusiness';
import { fetchCustomerByEmailOrPhoneAndBusinessId } from '../../../lib/apiClientCustomer';
import {
    DashboardContainer,
    CustomContainer,
} from '../../../styles/CustomerStyle/CustomerDashboardStyle';
import AppointmentOverview from './AppointmentOverview';
import { useAppointmentsContext } from '../../../context/AppointmentsContext';

const DeleteAppointmentCustomer = () => {
    const { t } = useTranslation('deleteAppointmentCustomer');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const businessName = queryParams.get('business_name');
    const [businessInfo, setBusinessInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [viewState, setViewState] = useState('inputEmailOrPhone');
    const { fetchAppointmentsForCustomer, deleteAppointmentForCustomer } = useAppointmentsContext();

    // State for handling the Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    // State for handling the "no appointments found" Snackbar
    const [noAppointmentsSnackbarOpen, setNoAppointmentsSnackbarOpen] = useState(false);

    // Fetch business information when the component mounts
    useEffect(() => {
        const fetchBusiness = async () => {
            if (!businessName) {
                setError('Business name not provided');
                setLoading(false);
                return;
            }
            try {
                const data = await fetchBusinessesByName(businessName);
                setBusinessInfo(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching business information');
                setLoading(false);
                console.error('Error fetching business:', error.message);
            }
        };
        fetchBusiness();
    }, [businessName]);

    const handleInputChange = (e) => {
        setEmailOrPhone(e.target.value);
    };

    const handleRetrieveAppointment = async (e) => {
        e.preventDefault();
        if (!emailOrPhone) {
            alert(t("insertEmailOrPhone"));
            return;
        }
        try {
            setLoading(true);
            const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessInfo.businessId);

            if (customer.customerId) {
                const appointmentsData = await fetchAppointmentsForCustomer(customer.customerId);
                const actualAppointments = appointmentsData?.$values || [];

                if (actualAppointments.length === 0) {
                    setNoAppointmentsSnackbarOpen(true);
                    setAppointments([]);
                } else {
                    setAppointments(actualAppointments);
                    setViewState('viewAppointments');
                }
            } else {
                setSnackbarMessage(t('customerNotFound'));
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error(t('errorRetrievingAppointment'), error.message);
            setError(t('errorRetrievingAppointment'));
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        setViewState('inputEmailOrPhone');
    };

    const handleDeleteAppointment = async (appointmentId, businessId) => {
        try {
            await deleteAppointmentForCustomer(appointmentId, businessId);
            setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.appointmentId !== appointmentId));
        } catch (error) {
            console.error('Error deleting appointment:', error.message);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setNoAppointmentsSnackbarOpen(false);
    };

    const renderContent = () => {
        switch (viewState) {
            case 'inputEmailOrPhone':
                return (
                    <FormContainer>
                        <BoldTypography>{t('insertEmailOrPhone')}</BoldTypography>
                        <form onSubmit={handleRetrieveAppointment}>
                            <StyledTextField
                                label={t('emailOrPhoneLabel')}
                                name="emailOrPhone"
                                value={emailOrPhone}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box display="flex" justifyContent="center">
                                <CustomButton type="submit">{t('retrieveButton')}</CustomButton>
                            </Box>
                        </form>
                    </FormContainer>
                );
            case 'viewAppointments':
                return (
                    <AppointmentOverview appointments={appointments} onDeleteAppointment={handleDeleteAppointment} />
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <div>Loading...</div>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <div>{error}</div>
            </Box>
        );
    }

    return (
        <DashboardContainer>
            <CustomerBusinessInfo
                businessInfo={businessInfo}
                buttonLabel={viewState === 'inputEmailOrPhone' ? 'Update Appointment' : 'Back'}
                onBackClick={handleBackClick}
            />
            <CustomContainer>
                {renderContent()}
            </CustomContainer>
            <StyledSnackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <StyledAlert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </StyledAlert>
            </StyledSnackbar>
            <StyledSnackbar
                open={noAppointmentsSnackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
            >
                <StyledAlert onClose={handleSnackbarClose} severity="info">
                    {t("noAppointmentsFound")}
                </StyledAlert>
            </StyledSnackbar>
        </DashboardContainer>
    );
};

export default DeleteAppointmentCustomer;