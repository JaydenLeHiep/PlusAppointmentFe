import React, { useState, useEffect } from 'react';
import {
  Box, MenuItem, Select, FormControl, InputLabel,
  CircularProgress, TextField, Stack
} from '@mui/material';
import { useCalculateMoneyContext } from '../../context/CalculateMoneyContext';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import OverviewTodayView from './views/OverviewTodayView';
import OverviewDayView from './views/OverviewDayView';
import OverviewWeekView from './views/OverviewWeekView';
import OverviewMonthView from './views/OverviewMonthView';
import OverviewYearView from './views/OverviewYearView';
import WeekPicker from './Pickers/WeekPicker';

import {
  boxStyle,
  stackStyle,
  formControlPeriodStyle,
  formControlMonthStyle,
  formControlYearStyle,
  yearSelectSx,
  loadingBoxStyle,
  weekPickerBoxStyle,
  textFieldDayStyle,
  transitionProps
} from '../../styles/CalculateMoney/OverviewPanelStyles';

const periodOptions = [
  { label: 'Yearly', value: 'year' },
  { label: 'Monthly', value: 'month' },
  { label: 'Weekly', value: 'week' },
  { label: 'Pick a Date', value: 'day' },
  { label: 'Today', value: 'today' }
];

const yearList = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);

const OverviewPanel = ({ businessId, currentWeek }) => {
  const {
    businessEarnings,
    businessTodaySummary,
    businessDailyEarnings,
    getBusinessYearlyEarnings,
    getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings,
    getBusinessDailyEarnings,
    getBusinessTodaySummary
  } = useCalculateMoneyContext();

  const now = new Date();
  const [period, setPeriod] = useState('today');
  const [selectedDate, setSelectedDate] = useState(format(now, 'yyyy-MM-dd'));
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedYearsBack, setSelectedYearsBack] = useState(5);
  const [loading, setLoading] = useState(false);

  const currentMonth = now.getMonth() + 1;

  useEffect(() => {
    if (!businessId) return;
    setLoading(true);
    let promise;
    if (period === 'year') {
      promise = getBusinessYearlyEarnings(businessId, selectedYearsBack);
    } else if (period === 'month') {
      promise = getBusinessMonthlyEarnings(businessId, selectedYear);
    } else if (period === 'week') {
      promise = getBusinessWeeklyEarnings(businessId, selectedYear, selectedWeek);
    } else if (period === 'day') {
      promise = getBusinessDailyEarnings(businessId, selectedDate);
    } else if (period === 'today') {
      promise = getBusinessTodaySummary(businessId);
    }
    Promise.resolve(promise).finally(() => setLoading(false));
  }, [
    businessId, period, selectedDate, selectedWeek, selectedYear, selectedYearsBack,
    getBusinessYearlyEarnings, getBusinessMonthlyEarnings,
    getBusinessWeeklyEarnings, getBusinessDailyEarnings, getBusinessTodaySummary,
    currentMonth
  ]);

  return (
    <Box sx={boxStyle}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={stackStyle}>
        <FormControl variant="outlined" size="small" sx={formControlPeriodStyle}>
          <InputLabel>Period</InputLabel>
          <Select
            label="Period"
            value={period}
            onChange={e => setPeriod(e.target.value)}
          >
            {periodOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {period === 'month' && (
          <FormControl size="small" sx={formControlMonthStyle}>
            <Select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              displayEmpty
              sx={yearSelectSx}
            >
              {yearList.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {period === 'year' && (
          <FormControl size="small" sx={formControlYearStyle}>
            <Select
              value={selectedYearsBack}
              onChange={e => setSelectedYearsBack(Number(e.target.value))}
              displayEmpty
              sx={yearSelectSx}
            >
              {[...Array(10)].map((_, n) => (
                <MenuItem key={n + 1} value={n + 1}>
                  {n + 1} year{n > 0 ? 's' : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {period === 'day' && (
          <TextField
            type="date"
            size="small"
            label="Pick a date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={textFieldDayStyle}
          />
        )}

        {period === 'week' && (
          <Box sx={weekPickerBoxStyle}>
            <WeekPicker
              year={selectedYear}
              week={selectedWeek}
              onChange={(year, week) => {
                setSelectedYear(year);
                setSelectedWeek(week);
              }}
            />
          </Box>
        )}
      </Stack>

      {loading ? (
        <Box sx={loadingBoxStyle}>
          <CircularProgress />
        </Box>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${period}-${period === 'day'
              ? selectedDate
              : period === 'week'
                ? `${selectedYear}-${selectedWeek}`
                : period === 'month'
                  ? selectedYear
                  : period === 'year'
                    ? selectedYearsBack
                    : ''}`}
            {...transitionProps}
          >
            {period === 'today' && <OverviewTodayView data={businessTodaySummary} />}
            {period === 'day' && <OverviewDayView data={businessDailyEarnings} date={selectedDate} />}
            {period === 'week' && (<OverviewWeekView data={businessEarnings} week={selectedWeek} year={selectedYear} />)}
            {period === 'month' && (<OverviewMonthView data={businessEarnings || []} year={selectedYear} onYearChange={setSelectedYear} />)}
            {period === 'year' && <OverviewYearView data={businessEarnings} yearsBack={selectedYearsBack} currentYear={new Date().getFullYear()} />}
          </motion.div>
        </AnimatePresence>
      )}
    </Box>
  );
};

export default OverviewPanel;