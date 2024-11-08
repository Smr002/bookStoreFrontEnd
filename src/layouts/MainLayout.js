// src/layouts/MainLayout.js
import React from 'react';
import { Box } from '@mui/material';
import FooterHomePage from '../components/FooterHomePage';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ onCategorySelect, selectedCategory }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with sticky positioning */}
      <Header  onCategorySelect={onCategorySelect} /> 

      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        {/* Main Content Area */}
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 3 }}>
          <Outlet /> {/* This is where nested routes will render */}
        </Box>
      </Box>

      {/* Footer */}
      <FooterHomePage />
    </Box>
  );
};

export default MainLayout;
