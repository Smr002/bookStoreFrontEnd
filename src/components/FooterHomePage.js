// src/components/FooterHomePage.js
import React from 'react';
import { Box, Typography, Button, Input } from '@mui/material';
import { Facebook, Twitter } from '@mui/icons-material';

const FooterHomePage = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Introduction Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Get to Know Bookstore
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
          Buy Books Online at BOOKSTORE
          <br />
          No matter what you're a fan of, from <a href="#fiction" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>Fiction</a>, <a href="#biography" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>Biography</a>, <a href="#scifi" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>Sci-Fi</a>, <a href="#mystery" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>Mystery</a>, <a href="#ya" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>YA</a>, <a href="#manga" style={{ color: '#ecf0f1', textDecoration: 'underline' }}>Manga</a>, and more, Barnes & Noble has the perfect book for you.
        </Typography>
      </Box>
      
      {/* Links Section */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" mb={4}>
        {['B&N Apps', 'B&N Audiobooks', 'B&N Reads Blog', 'B&N Podcast', 'B&N Membership', 'In Store Pickup', 'Gift Cards', 'Stores & Events', 'B&N Mastercard'].map((item) => (
          <Box key={item} textAlign="center" mx={2} color="#ecf0f1" sx={{ marginBottom: { xs: 2, md: 0 }, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
            <Typography variant="body2">{item}</Typography>
          </Box>
        ))}
      </Box>
      
      {/* Column Links Section */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-around" mb={4} sx={{ flexDirection: { xs: 'column', md: 'row' }, textAlign: { xs: 'center', md: 'left' } }}>
        {[
          { title: 'B&N Services', links: ['Affiliate Program', 'Publisher & Author Guidelines', 'Bulk Order Discounts'] },
          { title: 'About Us', links: ['About B&N', 'Careers at B&N'] },
          { title: 'Quick Help', links: ['Help Center', 'Covid Safety'] },
          { title: 'Shop by Category', links: ['Books', 'Fiction'] },
        ].map((column) => (
          <Box key={column.title} mx={2} sx={{ marginBottom: { xs: 3, md: 0 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{column.title}</Typography>
            <ul style={{ padding: 0, listStyleType: 'none', margin: 0 }}>
              {column.links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#ecf0f1', textDecoration: 'underline', fontSize: { xs: '0.9rem', sm: '1rem' } }}>{link}</a>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
      
      {/* Newsletter Subscription and Social Links */}
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" borderTop="1px solid #34495e" pt={3} sx={{ textAlign: 'center' }}>
        <Box display="flex" alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: 2, sm: 0 } }}>
          <Input
            type="email"
            placeholder="Email Address"
            sx={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px 0 0 5px',
              width: { xs: '100%', sm: '250px' },
              marginBottom: { xs: 1, sm: 0 },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#e67e22',
              color: '#fff',
              borderRadius: { xs: '5px', sm: '0 5px 5px 0' },
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: '#d35400',
              },
              padding: '10px 20px',
            }}
          >
            Submit
          </Button>
        </Box>
        <Box display="flex" gap={2} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          <a href="#facebook" style={{ color: '#ecf0f1' }}><Facebook /></a>
          <a href="#twitter" style={{ color: '#ecf0f1' }}><Twitter /></a>
        </Box>
      </Box>
    </footer>
  );
};

export default FooterHomePage;
