// src/pages/Categorie.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarCarosel from '../../components/NavbarCarosel';
import Categories from '../../components/Categories';  
import { Typography, Box, CircularProgress } from '@mui/material';
import { getBooksBySubject } from '../../api';

const Categorie = () => {
  const { category } = useParams(); // Capture category from URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]); // Clear previous books when fetching new ones

      try {
        const filteredBooks = await getBooksBySubject(category);
        setBooks(filteredBooks);

        if (filteredBooks.length === 0) {
          setError("No books found in this category.");
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]); // Re-run the effect when category changes

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <NavbarCarosel categories={[{ label: 'Restaurants' }, { label: 'Groceries' }, { label: 'Alcohol' }, { label: 'Health & Beauty' }]} />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Category: {category}
        </Typography>
        <Categories selectedCategory={category} /> {/* Pass category to Categories component */}
      </Box>
    </div>
  );
};

export default Categorie;
