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

const getChartData = (hourlyEarnings) => {
  const arr = Array.isArray(hourlyEarnings?.$values) ? hourlyEarnings.$values : [];
  return Array.from({ length: 12 }, (_, i) => {
    const startHour = i + 8;
    const entry = arr.find(w => Number(w.hour) === startHour);
    return {
      x: startHour + 0.5,
      interval: `${startHour}:00–${startHour + 1}:00`,
      earnings: entry ? entry.totalEarnings : 0
    };
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const { interval, earnings } = payload[0].payload;
    return (
      <div style={tooltipPaperStyle}>
        Earnings from <b>{interval}</b><br />
        <span style={{ fontSize: 18 }}>€{earnings}</span>
      </div>
    );
  }
  return null;
};

const EarningsBarChartDaily = ({ hourlyEarnings }) => {
  const chartData = getChartData(hourlyEarnings);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={chartMargin}>
        <CartesianGrid {...chartGridStyle} />
        <XAxis
          dataKey="x"
          type="number"
          ticks={Array.from({ length: 13 }, (_, i) => i + 8)}
          tickFormatter={tick => `${tick}:00`}
          domain={[8, 20.5]}
          allowDecimals={false}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="earnings"
          fill={chartBarColor}
          barSize={chartBarSize.daily}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningsBarChartDaily;