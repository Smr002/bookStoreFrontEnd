// src/components/SalesChart.js
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const SalesChart = ({ salesData }) => {
  // Calculate total sales and percentage increase
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const percentageIncrease = ((salesData[salesData.length - 1]?.sales - salesData[0]?.sales) / salesData[0]?.sales) * 100;

  return (
    <Box sx={{ backgroundColor: '#1e1e1e', color: 'white', padding: '1rem', borderRadius: '8px' }}>
      {/* Display total sales and percentage change */}
      <Typography variant="h6">Sessions</Typography>
      <Typography variant="h3">{totalSales.toLocaleString()}</Typography>
      <Typography variant="subtitle1" sx={{ color: percentageIncrease >= 0 ? 'green' : 'red' }}>
        {percentageIncrease >= 0 ? `+${percentageIncrease.toFixed(1)}%` : `${percentageIncrease.toFixed(1)}%`}
      </Typography>

      {/* Render the area chart */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={salesData}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#aaa' }} />
          <YAxis tick={{ fill: '#aaa' }} />
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <Tooltip />
          <Area type="monotone" dataKey="sales" stroke="#4A90E2" fillOpacity={1} fill="url(#colorSales)" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesChart;
