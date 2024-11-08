// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { getAllBooks, updateBook, deleteBook } from '../api'; // Assume deleteBook is an API call to delete a book
import { Box, Typography, CircularProgress, Modal, IconButton, TextField, Button, Dialog, DialogActions,Switch ,DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MuiAlert from '@mui/material/Alert';
import { alpha, styled } from '@mui/material/styles';
import { pink, red } from '@mui/material/colors';


const PinkSwitch = styled(Switch)(({ theme, checked }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: checked ? red[600] : pink[600],
    '&:hover': {
      backgroundColor: alpha(checked ? red[600] : pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: checked ? red[600] : pink[600],
  },
}));


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Controls delete dialog
  const [bookToDelete, setBookToDelete] = useState(null); // Book selected for deletion
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' }); // Snackbar notification

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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleArchiveToggle = (event) => {
    const checked = event.target.checked;
    setEditBook((prev) => ({ ...prev, archive: checked }));
  };

  // Open edit modal with selected book data
  const handleEditClick = (book) => {
    setEditBook({ ...book, id: book._id });
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (book) => {
    setBookToDelete({ ...book, id: book._id }); 
    setDeleteDialogOpen(true);
  };
  // Handle form changes for edit modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBook((prev) => ({ ...prev, [name]: value }));
  };

  // Save the updated book
  const handleSave = async () => {
    try {
      await updateBook(editBook._id, editBook);
      setBooks((prev) => prev.map((book) => (book.id === editBook.id ? editBook : book)));
      setEditBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
      alert('Failed to update book');
    }
  };

  const confirmDeleteBook = async () => {
    try {
      await deleteBook(bookToDelete._id); // Ensure _id is used if that's the primary key
  
      // Filter out the deleted book from the state
      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete._id));
  
      setNotification({ open: true, message: 'Book deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      setBookToDelete(null); // Clear the selected book for deletion
    } catch (error) {
      console.error('Failed to delete book:', error);
      setNotification({ open: true, message: 'Failed to delete book.', severity: 'error' });
    }
  };
  
  

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={styles.container}>
      {books.map((book) => (
        <Box key={book.id} sx={styles.card}>
          <img
            src={book.image || 'https://via.placeholder.com/150'}
            alt={book.name}
            style={styles.image}
            onClick={() => handleImageClick(book.image || 'https://via.placeholder.com/150')}
          />
          <Typography variant="h6" sx={styles.title}>{book.name}</Typography>
          <Typography>Author: {book.author}</Typography>
          <Typography>Stock: {book.stock}</Typography>
          <Typography>Sales: {book.noOfSell}</Typography>
          <Typography color={book.archive ? 'error' : 'primary'}>
            {book.archive ? 'Archived' : 'Available'}
          </Typography>
          <IconButton
            onClick={() => handleEditClick(book)}
            sx={{ mt: 1, color: 'black' }}
            aria-label="Edit book"
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
           onClick={() => handleDeleteClick(book)}
            sx={{ mt: 1, color: 'red' }}
            aria-label="Delete book"
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteBook} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <MuiAlert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity}>
          {notification.message}
        </MuiAlert>
      </Snackbar>

      {/* Modal to display the enlarged image */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={styles.modalImageContainer}>
          <img src={selectedImage} alt="Enlarged Book Cover" style={styles.modalImage} />
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={Boolean(editBook)}
        onClose={() => setEditBook(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={styles.editModal}>
          <Typography variant="h6" sx={{ mb: 2 }}>Edit Book</Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editBook?.name || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={editBook?.stock || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Sales"
            name="noOfSell"
            type="number"
            value={editBook?.noOfSell || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={editBook?.image || ''}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
           <Typography variant="body" sx={{ mb: 1 ,px:3 ,color:'white'}}>
            Archive Status
          </Typography>
          <PinkSwitch
            checked={editBook?.archive || false}
            onChange={handleArchiveToggle}
            inputProps={{ 'aria-label': 'archive status' }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}  sx={{ mt: 15,ml:-9 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    width: '200px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  modalImageContainer: {
    maxWidth: '80%',
    maxHeight: '80%',
    outline: 'none',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  editModal: {
    width: '400px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
  },
};

export default BookList;
