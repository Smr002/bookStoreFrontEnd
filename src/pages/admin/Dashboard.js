import React from 'react';
import { Typography } from '@mui/material';
import Dashboard from '../../components/Dashboard';

const Dashboard = () => {
    return (
        <><div>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Typography>Welcome to the Admin Dashboard!</Typography>
        </div><div>
                <Dashboard />
            </div></>
    );
};

export default Dashboard;
