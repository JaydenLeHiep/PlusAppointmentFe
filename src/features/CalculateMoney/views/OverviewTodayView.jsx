import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/ListAlt';
import StatCard from '../StatCard';
import EarningsBarChartDaily from '../Charts/EarningsBarChartToday';
import { statGridContainer, statPaper, statTitle } from '../../../styles/CalculateMoney/OverviewCommonStyles';

const empty = { totalEarnings: 0, sessionCount: 0, inProgressSessionCount: 0, hourlyEarnings: [] };

export default function OverviewTodayView({ data }) {
    const dailyData = data && typeof data === 'object'
        ? {
            totalEarnings: data.totalEarnings ?? 0,
            sessionCount: data.sessionCount ?? 0,
            inProgressSessionCount: data.inProgressSessionCount ?? 0,
            hourlyEarnings: data.hourlyEarnings ?? [],
        }
        : empty;

    return (
        <>
            <Grid container spacing={2} sx={statGridContainer}>
                <Grid item xs={12} md={4}>
                    <StatCard icon={<MonetizationOnIcon fontSize="large" />} label="Total Earnings" value={`${dailyData.totalEarnings} €`} color="primary" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard icon={<PeopleIcon fontSize="large" />} label="Total Sessions" value={dailyData.sessionCount} color="success" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard icon={<ListIcon fontSize="large" />} label="In Progress" value={dailyData.inProgressSessionCount} color="warning" />
                </Grid>
            </Grid>
            <Paper elevation={0} sx={statPaper}>
                <Typography variant="subtitle1" sx={statTitle}>Earnings by Hour</Typography>
                <EarningsBarChartDaily hourlyEarnings={dailyData.hourlyEarnings} />
            </Paper>
        </>
    );
}