// src/pages/AllCategoriesPage.js
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FooterHomePage from '../../components/FooterHomePage';
import NavbarCarosel from '../../components/NavbarCarosel';

import { getAllBooks } from '../../api';
import { CircularProgress, Typography, Box, Grid } from '@mui/material';

import AllBooks from '../../components/AllBooks';  

const AllCategoriesPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const categories = [
    { label: 'Restaurants' },
    { label: 'Groceries' },
    { label: 'Alcohol' },
    { label: 'Health & Beauty' },
  ];

  return (
    <div>
   
      <NavbarCarosel categories={categories} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: '2rem', paddingLeft: '1rem' }}>
          All Books
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" sx={{ marginTop: '2rem' }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
            {nonArchivedBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <AllBooks book={book} /> 
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </div>
  );
};

export default AllCategoriesPage;
