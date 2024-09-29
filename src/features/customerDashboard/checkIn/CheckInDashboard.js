import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerBusinessInfo from '../CustomerBusinessInfo';
import { fetchBusinessesByName } from '../../../lib/apiClientBusiness';
import CheckInNewCustomer from './checkInNewCustomer/checkInNewCustomer';
import CheckInOldCustomer from './checkInOldCustomer/checkInOldCustomer';

const CheckInDashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const businessName = queryParams.get('business_name');

    const [businessInfo, setBusinessInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [view, setView] = useState(''); // State to control which component to show
    const [customerData, setCustomerData] = useState(null); // Store customer data to pass between components

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

    // Display different views based on `view` state
    if (view === 'newCustomer') {
        return (
            <CheckInNewCustomer
                businessId={businessInfo.businessId}
                onCustomerAdded={(newCustomer) => {
                    setCustomerData(newCustomer);
                    setView('oldCustomer');
                }}
            />
        );
    }

    if (view === 'oldCustomer') {
        return (
            <CheckInOldCustomer
                businessId={businessInfo.businessId}
                customerData={customerData}
                onNewCustomer={() => setView('newCustomer')}
            />
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* Display Welcome Message */}
            

            {/* Display Customer Business Info */}
            <CustomerBusinessInfo businessInfo={businessInfo} />
            <h1>Welcome to {businessName}</h1>

            {/* Buttons for New or Existing Customers */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    onClick={() => setView('newCustomer')}
                >
                    Are you a new customer?
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                    onClick={() => setView('oldCustomer')}
                >
                    Are you already a customer with us?
                </button>
            </div>
        </div>
    );
}

export default CheckInDashboard;
