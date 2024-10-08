import React from 'react';
import { StyledTableContainer, StyledTable } from '../../styles/CustomersInfo/CustomerInfoStyles';
import { TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomerTable = ({ customers, handleEditCustomer, confirmDeleteCustomer }) => {
  const { t } = useTranslation('customerInfo');
  
  return (
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
          {customers.map((customer) => (
            <TableRow key={customer.customerId}>
              <TableCell sx={{ width: '30%' }} style={{ border: '1px solid #ccc' }}>
                <Typography variant="body1" fontWeight="bold">{customer.name}</Typography>
                <Typography variant="body2">{customer.email}</Typography>
                <Typography variant="body2">{customer.phone}</Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }} align="center" style={{ border: '1px solid #ccc' }}>
                {customer.birthday ? new Date(customer.birthday).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : t('unknown')}
              </TableCell>
              <TableCell sx={{ width: '5%' }} align="center" style={{ border: '1px solid #ccc' }}>
                {customer.wantsPromotion ? t('yes') : t('no')}
              </TableCell>
              <TableCell sx={{ width: '5%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.totalBookings || 0}</TableCell>
              <TableCell sx={{ width: '25%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.lastBooking || t('noBookings')}</TableCell>
              <TableCell sx={{ width: '10%' }} align="center" style={{ border: '1px solid #ccc' }}>
                <IconButton onClick={() => handleEditCustomer(customer)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => confirmDeleteCustomer(customer.customerId)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default CustomerTable;