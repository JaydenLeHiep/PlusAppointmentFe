import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useCustomersContext } from '../../../../context/CustomerContext';
import { useTranslation } from 'react-i18next';

const CustomerSearch = ({ newAppointment, customerSearch, setCustomerSearch, setNewAppointment, alert, setAlert }) => {
    const { t } = useTranslation('customerSearch');
    const { searchCustomers, customers } = useCustomersContext();
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleCustomerSearch = async () => {
        setSearchPerformed(true);
        try {
            await searchCustomers(customerSearch);
        } catch (error) {
            setAlert({ message: t('searchFailed'), severity: 'error' });
        }
    };

    const handleSelectCustomer = (customer) => {
        setNewAppointment({ ...newAppointment, customerId: parseInt(customer.customerId, 10) });
        setCustomerSearch(`${customer.name} - ${customer.phone}`);
        setSearchPerformed(false);
    };

    return (
        <Box>
            <TextField
                label={t('searchLabel')}
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                margin="dense"
                fullWidth
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleCustomerSearch}>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
            {searchPerformed && (
                <Box
                    sx={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        marginTop: '8px',
                        padding: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        '&::-webkit-scrollbar': {
                            width: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ccc',
                            borderRadius: '8px'
                        }
                    }}
                >
                    {customers.length === 0 ? (
                        <Typography>{t('noCustomerFound')}</Typography>
                    ) : (
                        <List>
                            {customers.slice(0, 3).map((customer) => (
                                <ListItem key={customer.customerId} button onClick={() => handleSelectCustomer(customer)}>
                                    <ListItemText primary={`${customer.name} - ${customer.phone}`} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default CustomerSearch;