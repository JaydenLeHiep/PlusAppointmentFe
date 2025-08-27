import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {
    chartMargin,
    chartBarColor,
    chartBarSize,
    chartGridStyle,
    tooltipPaperStyle
} from '../../../styles/CalculateMoney/Charts/ChartsCommonStyles';

const getChartData = (arr) => {
    return Array.isArray(arr)
        ? arr.map(y => ({
            year: y.year,
            earnings: y.totalEarnings,
            sessionCount: y.sessionCount,
        }))
        : [];
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
        const { year, earnings, sessionCount } = payload[0].payload;
        return (
            <div style={tooltipPaperStyle}>
                <b>{year}</b><br />
                <span style={{ fontSize: 18 }}>Earnings: €{earnings}</span><br />
                Sessions: {sessionCount}
            </div>
        );
    }
    return null;
};

const EarningsBarChartYearly = ({ yearlyDetails }) => {
    const chartData = getChartData(yearlyDetails);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={chartData}
                margin={chartMargin}
            >
                <CartesianGrid {...chartGridStyle} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" fill={chartBarColor} barSize={chartBarSize.yearly} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EarningsBarChartYearly;