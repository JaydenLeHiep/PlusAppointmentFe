import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import StatCard from '../StatCard';
import EarningsBarChartMonthly from '../Charts/EarningsBarChartMonthly';
import { statGridContainer, statPaper, statTitle } from '../../../styles/CalculateMoney/OverviewCommonStyles';

function getMonthlyArr(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.$values)) return data.$values;
    return [];
}

export default function OverviewMonthView({ data, year, onYearChange }) {
    const monthlyArr = getMonthlyArr(data);

    const totalEarnings = monthlyArr.reduce((sum, m) => sum + (m.totalEarnings || 0), 0);
    const totalSessions = monthlyArr.reduce((sum, m) => sum + (m.sessionCount || 0), 0);

    return (
        <>
            <Grid container spacing={2} sx={statGridContainer}>
                <Grid item xs={6} md={4}>
                    <StatCard
                        icon={<MonetizationOnIcon fontSize="large" />}
                        label="Total Earnings"
                        value={`${totalEarnings} €`}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <StatCard
                        icon={<PeopleIcon fontSize="large" />}
                        label="Total Sessions"
                        value={totalSessions}
                        color="success"
                    />
                </Grid>
            </Grid>
            <Paper elevation={0} sx={statPaper}>
                <Typography variant="subtitle1" sx={statTitle}>
                    Overview for Year {year}
                </Typography>
                <EarningsBarChartMonthly monthlyDetails={data} year={year} />
            </Paper>
        </>
    );
}