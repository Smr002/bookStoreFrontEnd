// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        textAlign: 'center',
        backgroundColor: 'black',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} My Application
      </Typography>
    </Box>
  );
};

export default Footer;
