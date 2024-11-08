// src/components/BookCard.js
import React from 'react';
import { Box, Typography, Button, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createAddCard } from '../api';

const BookCard = ({ book, rank }) => {
  const handleAddToCard = async () => {
    const bookData = {
      bookId: book._id,
      name: book.name,
      price: book.price,
      image: book.image,
      quantity: 1,
    };

    try {
      await createAddCard(bookData);
      alert(`${book.name} has been added to your card.`);
    } catch (error) {
      alert('Failed to add book to card. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
        alignItems: { xs: 'center', sm: 'flex-start' }, // Center items on small screens
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        gap: { xs: '1rem', sm: '1.5rem' },
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Left Section: Rank, Cover Image, Wishlist Icon */}
      <Box sx={{ position: 'relative', width: { xs: '100%', sm: '120px' } }}>
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: '-8px',
            left: '-24px',
            color: '#333',
            fontSize: { xs: '1rem', sm: '1.2rem' },
            fontWeight: 'bold',
          }}
        >
          {rank}
        </Typography>
        <Box
          component="img"
          src={book.image || 'https://via.placeholder.com/100x150'}
          alt={book.title}
          sx={{
            width: '100%',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            height: { xs: 'auto', sm: '150px' },
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#333',
            backgroundColor: '#fff',
            padding: '4px',
            '&:hover': {
              color: '#ff4081',
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Right Section: Book Details */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
        {/* Book Title and Author */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', lineHeight: '1.3', fontSize: { xs: '1rem', sm: '1.2rem' } }}>
          {book.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', marginBottom: '0.5rem', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          by {book.author}
        </Typography>

        {/* Rating */}
        <Rating value={book.rating || 0} readOnly precision={0.5} size="small" sx={{ marginBottom: '0.5rem' }} />

        {/* Format */}
        <Typography variant="body2" sx={{ fontWeight: '500', marginBottom: '0.5rem', color: '#666', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Format: {book.format}
        </Typography>

        {/* Price and Discount */}
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center', gap: '0.5rem' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e74c3c', fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            ${book.discountedPrice?.toFixed(2) || book.price.toFixed(2)}
          </Typography>
          {book.discountedPrice && (
            <>
              <Typography variant="body2" sx={{ color: '#999', textDecoration: 'line-through', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                ${book.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: '#2ecc71', fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                SAVE {Math.round(100 - (book.discountedPrice / book.price) * 100)}%
              </Typography>
            </>
          )}
        </Box>

        {/* Additional Formats */}
        <Typography variant="body2" sx={{ color: '#0066cc', marginTop: '0.5rem', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          Also available as: eBook, Audiobook, See All
        </Typography>
      </Box>

      {/* Add to Cart Button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: { xs: '100%', sm: 'auto' } }}>
        <Button
          variant="contained"
          onClick={handleAddToCard}
          sx={{
            backgroundColor: '#0066cc',
            color: '#fff',
            fontWeight: 'bold',
            padding: { xs: '0.5rem 1rem', sm: '0.6rem 1.5rem' },
            fontSize: { xs: '0.9rem', sm: '1rem' },
            marginTop: { xs: '1rem', sm: '0' },
            '&:hover': {
              backgroundColor: '#005bb5',
            },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default BookCard;
