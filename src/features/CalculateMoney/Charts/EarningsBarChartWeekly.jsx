import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
    chartMargin,
    chartBarColor,
    chartBarSize,
    chartGridStyle,
    tooltipPaperStyle
} from '../../../styles/CalculateMoney/Charts/ChartsCommonStyles';

const WEEK_DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length > 0) {
        const { day, earnings } = payload[0].payload;
        return (
            <div style={tooltipPaperStyle}>
                <b>{day}</b><br />
                <span style={{ fontSize: 18 }}>Earnings: €{earnings}</span>
            </div>
        );
    }
    return null;
}

export default function EarningsBarChartWeekly({ dailyDetails }) {
    const data = React.useMemo(() => {
        const { normalizeWeeklyData } = require('../../../utils/normalizeWeeklyData');
        return normalizeWeeklyData(dailyDetails);
    }, [dailyDetails]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={chartMargin}>
                <CartesianGrid {...chartGridStyle} />
                <XAxis
                    dataKey="day"
                    tickFormatter={day =>
                        WEEK_DAYS_SHORT[
                            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(day)
                        ]
                    }
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" fill={chartBarColor} barSize={chartBarSize.weekly} />
            </BarChart>
        </ResponsiveContainer>
    );
}