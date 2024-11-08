// src/pages/Index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FooterHomePage from '../components/FooterHomePage';
import NavbarCarosel from '../components/NavbarCarosel';
import BookCarousel from '../components/BookCarousel';
import { getAllBooks } from '../api';
import { CircularProgress, Typography, Box, Grid } from '@mui/material';
import BookCard from '../components/BookCard';

const Index = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example categories data, could be dynamically fetched from an API
  const categories = [
    { label: 'Restaurants' },
    { label: 'Groceries' },
    { label: 'Alcohol' },
    { label: 'Health & Beauty' },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter out archived books
  const nonArchivedBooks = books.filter((book) => !book.archive);

  return (
    <div>
 
      
      <Box sx={{ padding: '2rem' }}>
        {/* Render NavbarCarousel with dynamic categories */}
        <NavbarCarosel categories={categories} />
        <Typography variant="h5" sx={{ fontWeight: 'bold',marginTop:'2rem', paddingLeft: '1rem' }}>
        Bestsellers
      </Typography>
        {/* Loading and Error Handling */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <>

            {/* Book Carousel Component */}
            <BookCarousel books={nonArchivedBooks} />
            <Typography variant="h5" sx={{ fontWeight: 'bold',marginTop:'2rem', paddingLeft: '1rem' }}>
        All Books
      </Typography>
            {/* Grid of BookCards */}
            <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
              {nonArchivedBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>


     
    </div>
  );
};

export default Index;
