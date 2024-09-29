import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from '../CustomerBusinessInfo';
import { fetchBusinessesByName } from '../../../lib/apiClientBusiness';
import CheckInNewCustomer from './checkInNewCustomer';
import CheckInOldCustomer from './checkInOldCustomer';
import CheckInInfo from './CheckInInfo';
import { MainContainer } from '../../../styles/CustomerStyle/Checkin/CheckInDashboardStyle';

const CheckInDashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const businessName = queryParams.get('business_name');

    const [businessInfo, setBusinessInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [view, setView] = useState('oldCustomer');
    const [customerData, setCustomerData] = useState(null);

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

    if (error) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                <h6>{error}</h6>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!businessInfo.businessId) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                <h6>Error: Business ID not provided</h6>
            </div>
        );
    }

    const handleBackToDashboard = () => {
        setView('oldCustomer');
    };

    return (
        <>
            <CustomerBusinessInfo businessInfo={businessInfo} />
            <MainContainer>
                {view === 'oldCustomer' && (
                    <CheckInOldCustomer
                        businessId={businessInfo.businessId}
                        customerData={customerData}
                        onNewCustomer={() => setView('newCustomer')}
                    />
                )}

                {view === 'newCustomer' && (
                    <CheckInNewCustomer
                        businessId={businessInfo.businessId}
                        onCustomerAdded={(newCustomer) => {
                            setCustomerData(newCustomer);
                            setView('oldCustomer');
                        }}
                        onBack={handleBackToDashboard}
                    />
                )}

                {view === 'checkInInfo' && (
                    <CheckInInfo
                        customerName={customerData?.name}
                        customerId={customerData?.customerId}
                        businessId={businessInfo.businessId}
                        onBack={handleBackToDashboard} 
                    />
                )}
            </MainContainer>
        </>
    );
};

export default CheckInDashboard;