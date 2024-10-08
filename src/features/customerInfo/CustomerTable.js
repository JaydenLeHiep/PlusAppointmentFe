import React, { useState } from 'react';
import { StyledTableContainer, StyledTable } from '../../styles/CustomersInfo/CustomerInfoStyles';
import { TableBody, TableCell, TableHead, TableRow, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, FilterAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CustomerTable = ({ customers, handleEditCustomer, confirmDeleteCustomer }) => {
  const { t } = useTranslation('customerInfo');

  const [sortOrder, setSortOrder] = useState('asc');
  const [promotionFilter, setPromotionFilter] = useState('all');
  const [bookingsFilter, setBookingsFilter] = useState('all');
  const [lastBookingFilter, setLastBookingFilter] = useState('all');
  const [searchName, setSearchName] = useState('');

  // State for filter menu
  const [anchorElPromotion, setAnchorElPromotion] = useState(null);
  const [anchorElBookings, setAnchorElBookings] = useState(null);
  const [anchorElLastBooking, setAnchorElLastBooking] = useState(null);

  const handleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleOpenMenu = (event, type) => {
    if (type === 'promotion') setAnchorElPromotion(event.currentTarget);
    if (type === 'bookings') setAnchorElBookings(event.currentTarget);
    if (type === 'lastBooking') setAnchorElLastBooking(event.currentTarget);
  };

  const handleCloseMenu = (type) => {
    if (type === 'promotion') setAnchorElPromotion(null);
    if (type === 'bookings') setAnchorElBookings(null);
    if (type === 'lastBooking') setAnchorElLastBooking(null);
  };

  const filteredCustomers = customers
    .filter(customer => {
      // Filter by promotion
      if (promotionFilter === 'yes' && !customer.wantsPromotion) return false;
      if (promotionFilter === 'no' && customer.wantsPromotion) return false;

      // Filter by bookings
      if (bookingsFilter === 'greaterThan10' && customer.totalBookings <= 10) return false;
      if (bookingsFilter === 'greaterThan50' && customer.totalBookings <= 50) return false;

      // Filter by last booking
      if (lastBookingFilter === 'with' && !customer.lastBooking) return false;
      if (lastBookingFilter === 'without' && customer.lastBooking) return false;

      // Filter by search name
      if (searchName && !customer.name.toLowerCase().includes(searchName.toLowerCase())) return false;

      return true;
    })
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  return (
    <StyledTableContainer>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            {/* Information column with sorting */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc' }}>
              {t('information')}
              <IconButton size="small" onClick={handleSort}>
                {sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
              </IconButton>
            </TableCell>

            {/* Birthday column */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>
              {t('birthday')}
            </TableCell>

            {/* Promotion column with filter */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>
              {t('promotion')}
              <IconButton size="small" onClick={(e) => handleOpenMenu(e, 'promotion')}>
                <FilterAlt fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorElPromotion}
                open={Boolean(anchorElPromotion)}
                onClose={() => handleCloseMenu('promotion')}
              >
                <MenuItem onClick={() => setPromotionFilter('all')}>{t('allPromotions')}</MenuItem>
                <MenuItem onClick={() => setPromotionFilter('yes')}>{t('yes')}</MenuItem>
                <MenuItem onClick={() => setPromotionFilter('no')}>{t('no')}</MenuItem>
              </Menu>
            </TableCell>

            {/* Bookings column with filter */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>
              {t('bookings')}
              <IconButton size="small" onClick={(e) => handleOpenMenu(e, 'bookings')}>
                <FilterAlt fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorElBookings}
                open={Boolean(anchorElBookings)}
                onClose={() => handleCloseMenu('bookings')}
              >
                <MenuItem onClick={() => setBookingsFilter('all')}>{t('allBookings')}</MenuItem>
                <MenuItem onClick={() => setBookingsFilter('greaterThan10')}>{t('> 10 Bookings')}</MenuItem>
                <MenuItem onClick={() => setBookingsFilter('greaterThan50')}>{t('> 50 Bookings')}</MenuItem>
              </Menu>
            </TableCell>

            {/* Last Booking column with filter */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>
              {t('lastBooking')}
              <IconButton size="small" onClick={(e) => handleOpenMenu(e, 'lastBooking')}>
                <FilterAlt fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorElLastBooking}
                open={Boolean(anchorElLastBooking)}
                onClose={() => handleCloseMenu('lastBooking')}
              >
                <MenuItem onClick={() => setLastBookingFilter('all')}>{t('allLastBookings')}</MenuItem>
                <MenuItem onClick={() => setLastBookingFilter('with')}>{t('withLastBooking')}</MenuItem>
                <MenuItem onClick={() => setLastBookingFilter('without')}>{t('withoutLastBooking')}</MenuItem>
              </Menu>
            </TableCell>

            {/* Edit column */}
            <TableCell style={{ fontWeight: 'bold', border: '1px solid #ccc', textAlign: 'center' }}>
              {t('edit')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.customerId}>
              <TableCell sx={{ width: '20%' }} style={{ border: '1px solid #ccc' }}>
                <Typography variant="body1" fontWeight="bold">{customer.name}</Typography>
                <Typography variant="body2">{customer.email}</Typography>
                <Typography variant="body2">{customer.phone}</Typography>
              </TableCell>
              <TableCell sx={{ width: '25%' }} align="center" style={{ border: '1px solid #ccc' }}>
                {customer.birthday ? new Date(customer.birthday).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : t('unknown')}
              </TableCell>
              <TableCell sx={{ width: '15%' }} align="center" style={{ border: '1px solid #ccc' }}>
                {customer.wantsPromotion ? t('yes') : t('no')}
              </TableCell>
              <TableCell sx={{ width: '15%' }} align="center" style={{ border: '1px solid #ccc' }}>{customer.totalBookings || 0}</TableCell>

              <TableCell sx={{ width: '25%' }} align="center" style={{ border: '1px solid #ccc' }}>
                {customer.lastBooking || t('noBookings')}
              </TableCell>
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
