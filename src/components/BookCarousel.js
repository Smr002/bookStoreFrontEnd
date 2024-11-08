import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createAddCard } from '../api';

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowForwardIosIcon
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '30px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#333',
        fontSize: '2rem',
        zIndex: 2,
      }}
    />
  );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowBackIosIcon
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '30px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#333',
        fontSize: '2rem',
        zIndex: 2,
      }}
    />
  );
};

const BookCarousel = ({ books }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleAddToCard = async () => {
    const bookData = {
      bookId: books._id,       
      name: books.name,
      price: books.price,
      image: books.image, 
      quantity: 1            
    };
    
    try {
      await createAddCard(bookData);
      alert(`${books.name} has been added to your card.`);
    } catch (error) {
      alert('Failed to add book to card. Please try again.');
      console.error(error);
    }
  };
  

  return (
    <Box sx={{ width: '100%', padding: '2rem 0', borderRadius: '8px' }}>
 
      <Slider {...settings}>
        {books.map((book, index) => (
          
          <Box
            key={book.id || index}
            sx={{
              padding: '1rem',
              textAlign: 'center',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              },
              position: 'relative',
            }}
          >
            {/* Image Container with Padding for Small Border Effect */}
            <Box
              sx={{
                padding: '15px', // Small padding to act as a "border"
                backgroundColor: '#fff',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '220px', // Container width slightly larger than image
                mx: 'auto',
                position: 'relative',
              }}
            >
              {/* Book Image */}
              <Box
                component="img"
                src={book.image || 'https://via.placeholder.com/120x180'}
                alt={book.title}
                sx={{
                  width: '200px', // Image width
                  height: '280px', // Image height
                  borderRadius: '4px',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />

              {/* Hover Overlay with Book Title, Price, and "Shop Now" Button */}
              <Box
                className="shop-now-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '8px',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.5rem' }}
                >
                  {book.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#ffb300', fontWeight: 'bold', marginBottom: '1rem' }}
                >
                  ${book.price?.toFixed(2) || 'N/A'}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleAddToCard}
                  color="primary"
                  sx={{
                    backgroundColor: '#ffb300',
                    color: '#fff',
                    padding: '0.5rem 1.5rem',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: '#ff9a00',
                      
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default BookCarousel;
