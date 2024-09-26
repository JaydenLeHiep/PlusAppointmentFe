import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { StyledTextField, CustomButton, FormContainer, FormTitle } from '../../../styles/CustomerStyle/UpdateAppointmentStyles/UpdateAppointmentCustomerStyles';
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

const UpdateAppointmentCustomer = () => {
    const { t } = useTranslation('updateAppointment');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const businessName = queryParams.get('business_name');
    const [businessInfo, setBusinessInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [viewState, setViewState] = useState('inputEmailOrPhone');
    const { fetchAppointmentsForCustomer, deleteAppointmentAndUpdateList } = useAppointmentsContext();

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
            alert("Please enter customer email or phone number");
            return;
        }
        try {
            setLoading(true);
            const customer = await fetchCustomerByEmailOrPhoneAndBusinessId(emailOrPhone, businessInfo.businessId);

            if (customer.customerId) {
                const appointmentsData = await fetchAppointmentsForCustomer(customer.customerId);
                const actualAppointments = appointmentsData?.$values ? appointmentsData.$values : (Array.isArray(appointmentsData) ? appointmentsData : []);

                if (actualAppointments.length === 0) {
                    setError("No appointments found for this customer.");
                    setAppointments([]);
                } else {
                    setAppointments(actualAppointments);
                    setViewState('viewAppointments');
                }
            } else {
                setError('Customer not found');
            }
        } catch (error) {
            console.error('Error retrieving appointment:', error.message);
            setError('Error retrieving appointment');
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        setViewState('inputEmailOrPhone');
    };

    const handleDeleteAppointment = async (appointmentId, businessId) => {
        try {
            await deleteAppointmentAndUpdateList(appointmentId, businessId);
            // Remove the deleted appointment from the state
            setAppointments((prevAppointments) => prevAppointments.filter(appointment => appointment.appointmentId !== appointmentId));
        } catch (error) {
            console.error('Error deleting appointment:', error.message);
        }
    };

    const renderContent = () => {
        switch (viewState) {
            case 'inputEmailOrPhone':
                return (
                    <FormContainer>
                        <FormTitle>{t('retrieveAppointment')}</FormTitle>
                        <form onSubmit={handleRetrieveAppointment} style={{ width: '100%', maxWidth: '400px' }}>
                            <StyledTextField
                                label={t('emailOrPhoneLabel')}
                                name="emailOrPhone"
                                value={emailOrPhone}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box display="flex" justifyContent="center">
                                <CustomButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {t('retrieveButton')}
                                </CustomButton>
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
        </DashboardContainer>
    );
};

export default UpdateAppointmentCustomer;