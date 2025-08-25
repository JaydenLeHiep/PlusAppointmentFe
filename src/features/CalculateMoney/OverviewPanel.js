import React, { useState, useEffect } from 'react';
import { Typography, Box, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useCalculateMoneyContext } from '../../context/CalculateMoneyContext';

const periodOptions = [
  { label: 'Yearly', value: 'year' },
  { label: 'Monthly', value: 'month' },
  { label: 'Weekly', value: 'week' },
  { label: 'Daily', value: 'day' },
];

const OverviewPanel = ({ businessId }) => {
  const { 
    businessEarnings,
    getBusinessYearlyEarnings,
    getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings,
    getBusinessDailyEarnings
  } = useCalculateMoneyContext();

  const [period, setPeriod] = useState('year');
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentWeek = (() => {
    const date = new Date(now.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  })();
  const today = now.toISOString().split('T')[0];

  useEffect(() => {
    if (!businessId) return;

    setLoading(true);

    let promise;
    if (period === 'year') {
      promise = getBusinessYearlyEarnings(businessId, currentYear);
    } else if (period === 'month') {
      promise = getBusinessMonthlyEarnings(businessId, currentYear, currentMonth);
    } else if (period === 'week') {
      promise = getBusinessWeeklyEarnings(businessId, currentYear, currentWeek);
    } else if (period === 'day') {
      promise = getBusinessDailyEarnings(businessId, today);
    }

    Promise.resolve(promise)
      .finally(() => setLoading(false));
  }, [businessId, period, getBusinessYearlyEarnings, getBusinessMonthlyEarnings, 
    getBusinessWeeklyEarnings, getBusinessDailyEarnings, currentMonth, currentWeek, currentYear, today]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Finance Overview
      </Typography>
      <Typography variant="body2" sx={{ color: 'gray', marginBottom: 2 }}>
        Choose between yearly, monthly, weekly, or daily to see details.
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Period</InputLabel>
        <Select
          label="Period"
          value={period}
          onChange={e => setPeriod(e.target.value)}
        >
          {periodOptions.map(opt => (
            <MenuItem value={opt.value} key={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Earnings Summary:
            </Typography>
            <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 6 }}>
              {JSON.stringify(businessEarnings, null, 2)}
            </pre>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OverviewPanel;