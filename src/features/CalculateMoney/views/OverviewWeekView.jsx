import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import StatCard from '../StatCard';
import EarningsBarChartWeekly from '../Charts/EarningsBarChartWeekly';
import { getWeeksOfYear } from '../../../utils/dateRange';
import { statGridContainer, statPaper, statTitle, statYearNote } from '../../../styles/CalculateMoney/OverviewCommonStyles';

export default function OverviewWeekView({ data, week, year }) {
    const dailyDetails = data?.dailyDetails?.$values || data?.dailyDetails || [];

    const weekList = getWeeksOfYear(year);
    const weekInfo = weekList[week - 1] || { start: "?", end: "?" };
    const { start, end } = weekInfo;

    const totalEarnings = dailyDetails.reduce((sum, d) => sum + (d.totalEarnings || 0), 0);
    const totalSessions = dailyDetails.reduce((sum, d) => sum + (d.sessionCount || 0), 0);

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
                    Week {week} <span style={statYearNote}>({start} to {end})</span>
                </Typography>
                <EarningsBarChartWeekly dailyDetails={dailyDetails} />
            </Paper>
        </>
    );
}