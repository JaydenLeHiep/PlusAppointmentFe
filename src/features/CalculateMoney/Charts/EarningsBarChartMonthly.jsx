import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    chartMargin,
    chartBarColor,
    chartGridStyle,
    chartBarSize,
    tooltipPaperStyle
} from '../../../styles/CalculateMoney/Charts/ChartsCommonStyles';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function normalizeMonthlyData(monthlyDetails, year) {
    let detailsArr = [];
    if (Array.isArray(monthlyDetails)) {
        detailsArr = monthlyDetails;
    } else if (monthlyDetails && monthlyDetails.$values) {
        detailsArr = monthlyDetails.$values;
    } else if (monthlyDetails) {
        detailsArr = [monthlyDetails];
    }
    const byMonth = {};
    detailsArr.forEach(m => {
        if (m && m.month) byMonth[m.month - 1] = m;
    });
    return Array.from({ length: 12 }, (_, i) => ({
        month: MONTHS[i],
        monthNum: i + 1,
        year,
        earnings: byMonth[i]?.totalEarnings || 0,
        sessionCount: byMonth[i]?.sessionCount || 0,
    }));
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
        const { month, earnings, sessionCount } = payload[0].payload;
        return (
            <div style={tooltipPaperStyle}>
                <b>{month}</b><br />
                <span style={{ fontSize: 18 }}>Earnings: €{earnings}</span><br />
                Sessions: {sessionCount}
            </div>
        );
    }
    return null;
};

export default function EarningsBarChartMonthly({ monthlyDetails, year }) {
    const chartData = normalizeMonthlyData(monthlyDetails, year);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={chartMargin}
            >
                <CartesianGrid {...chartGridStyle} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" fill={chartBarColor} barSize={chartBarSize.monthly} />
            </BarChart>
        </ResponsiveContainer>
    );
}