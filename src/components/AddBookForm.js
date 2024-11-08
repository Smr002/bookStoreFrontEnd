import React, { useState } from 'react';
import { createBook } from '../api';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const AddBookForm = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState(''); // New state for the subject/category
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [noOfSell, setNoOfSell] = useState('');
  const [archive, setArchive] = useState(false);
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imageStatus, setImageStatus] = useState(null);

  // Fetch image URL, author name, and category from Open Library API by book title
  const fetchBookCover = async () => {
    if (!name.trim()) {
      alert("Please enter the book title first!");
      return;
    }

    setLoadingImage(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(name)}`);
      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        const bookData = data.docs[0];
        const coverId = bookData.cover_i;
        const authorName = bookData.author_name && bookData.author_name[0]; // First author name
        const bookSubject = bookData.subject && bookData.subject[0]; // First subject/category

        if (coverId) {
          const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
          setImage(coverUrl);
          setImageStatus("found");
        } else {
          setImage(null);
          setImageStatus("not_found");
        }

        // Set the author and subject in the state
        setAuthor(authorName || "Unknown Author");
        setSubject(bookSubject || "No category available");
      } else {
        setImage(null);
        setImageStatus("not_found");
        setAuthor("Unknown Author");
        setSubject("No category available");
      }
    } catch (error) {
      console.error('Error fetching book cover:', error);
      setImage(null);
      setImageStatus("not_found");
      setAuthor("Unknown Author");
      setSubject("No category available");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        name,
        author,
        subject, // Include the subject in the book data
        price: parseInt(price, 10),
        stock: parseInt(stock, 10),
        noOfSell: parseInt(noOfSell, 10),
        archive,
        image,
      };
  
      await createBook(bookData);
      alert('Book created successfully!');
      
      // Reset form fields
      setName('');
      setAuthor('');
      setSubject('');
      setPrice('');
      setStock('');
      setNoOfSell('');
      setArchive(false);
      setImage('');
      setImageStatus('');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add New Book</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Number of Sells"
          value={noOfSell}
          onChange={(e) => setNoOfSell(e.target.value)}
          required
          style={styles.input}
        />
        <label style={styles.label}>
          Archive
          <input
            type="checkbox"
            checked={archive}
            onChange={(e) => setArchive(e.target.checked)}
            style={styles.checkbox}
          />
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={fetchBookCover}
          disabled={loadingImage}
          style={{ marginBottom: '1rem' }}
        >
          {loadingImage ? <CircularProgress size={24} /> : 'Fetch Book Cover'}
        </Button>

        {/* Display status icon or image preview based on image fetch result */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {imageStatus === "found" ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          ) : imageStatus === "not_found" ? (
            <ImageNotSupportedIcon color="error" sx={{ fontSize: 40 }} />
          ) : null}
        </Box>

        {/* Display the book cover if found */}
        {image && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <img src={image} alt="Book Cover" style={styles.imagePreview} />
          </Box>
        )}

        <button type="submit" style={styles.button}>Create Book</button>
      </form>
    </Box>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    width: '100%',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    color: '#333',
    marginBottom: '1rem',
  },
  checkbox: {
    marginLeft: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '150px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
};

export default AddBookForm;
