// src/components/NavbarCarosel.js
import React from 'react';
import Slider from 'react-slick';
import { Box, Button, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1600x500?text=Holiday+Gift+Guide+Banner+1',
    title: 'Holiday Gift Guide',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1600x500?text=Holiday+Gift+Guide+Banner+2',
    title: 'Best Books of the Year',
    buttonText: 'Explore',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1600x500?text=Holiday+Gift+Guide+Banner+3',
    title: 'Gift Ideas for Everyone',
    buttonText: 'Discover',
  },
];

const NavbarCarosel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider {...settings}>
        {banners.map((banner) => (
          <Box
            key={banner.id}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: { xs: '300px', sm: '400px', md: '500px' }, // Responsive height
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for the Text Content */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                paddingX: { xs: 2, sm: 4 }, // Responsive padding for the overlay
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' }, // Responsive font size
                  textAlign: 'center' 
                }}
              >
                {banner.title}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ffb300',
                  color: '#333',
                  fontWeight: 'bold',
                  paddingX: { xs: '1rem', sm: '2rem' }, // Responsive padding
                  paddingY: { xs: '0.25rem', sm: '0.5rem' },
                  fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size for button text
                  '&:hover': {
                    backgroundColor: '#ffb300',
                  },
                }}
              >
                {banner.buttonText}
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default NavbarCarosel;
