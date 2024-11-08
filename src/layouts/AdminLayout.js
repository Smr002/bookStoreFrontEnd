


// src/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header with hamburger icon */}
      <AdminHeader onSidebarToggle={toggleSidebar} />

      {/* Sidebar - open as drawer on mobile */}
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Admin Content Area */}
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 3 }}>
          <Outlet /> {/* This is where nested routes will render */}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AdminLayout;
