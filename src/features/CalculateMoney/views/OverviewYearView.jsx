import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import StatCard from '../StatCard';
import EarningsBarChartYearly from '../Charts/EarningsBarChartYearly';
import { statGridContainer, statPaper, statTitle } from '../../../styles/CalculateMoney/OverviewCommonStyles';

function normalizeYearlyArr(data, yearsBack, currentYear) {
    let arr = [];
    if (!data) arr = [];
    else if (Array.isArray(data)) arr = data;
    else if (Array.isArray(data.$values)) arr = data.$values;

    const map = {};
    arr.forEach(y => {
        if (y && y.year) map[y.year] = y;
    });

    return Array.from({ length: yearsBack }, (_, i) => {
        const year = currentYear - i;
        return map[year] || { year, totalEarnings: 0, sessionCount: 0 };
    }).reverse();
}

export default function OverviewYearView({ data, yearsBack = 5, currentYear = new Date().getFullYear() }) {
    const yearlyArr = normalizeYearlyArr(data, yearsBack, currentYear);

    const totalEarnings = yearlyArr.reduce((sum, y) => sum + (y.totalEarnings || 0), 0);
    const totalSessions = yearlyArr.reduce((sum, y) => sum + (y.sessionCount || 0), 0);

    const years =
        yearlyArr.length > 0
            ? `${yearlyArr[0].year} – ${yearlyArr[yearlyArr.length - 1].year}`
            : '';

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
                    Overview for Years {years}
                </Typography>
                <EarningsBarChartYearly yearlyDetails={yearlyArr} />
            </Paper>
        </>
    );
}