import React, { useEffect, useState } from 'react';
import { getBooksBySubject, createAddCard } from '../api';
import "../allcategories.css";

const Categories = ({ selectedCategory }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]); // Clear previous books when fetching new ones

      try {
        // Fetch books based on the selected category
        const filteredBooks = await getBooksBySubject(selectedCategory);
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

    // Only fetch if there is a selected category
    if (selectedCategory) {
      fetchBooks();
    }
  }, [selectedCategory]);

  const handleAddToCart = async (book) => {
    const bookData = {
      bookId: book._id,
      name: book.name,
      price: book.price,
      image: book.image,
      quantity: 1,
    };

    try {
      await createAddCard(bookData);
      alert(`${book.name} has been added to your cart.`);
    } catch (err) {
      console.error("Failed to add book to cart:", err);
      alert("Failed to add book to cart. Please try again.");
    }
  };

  // Show loading indicator
  if (loading) return <div className="loading">Loading books...</div>;

  // Show error message if there’s an error or no books
  if (error) return <div className="error">{error}</div>;

  // Display books if available
  return (
   <div class='book-grid'>
      {books.map((book) => (
      <div className="book-card">
        <img src={book.image || "https://via.placeholder.com/300x200"} alt={book.name} className="book-image" />
        <div className="book-details">
          <p className="price">{book.price ? `$${book.price}` : "Price not available"}</p>
          <p className="title">{book.name}</p>
          <p className="author">by {book.author}</p>
          <p className="info">📚 {book.genre} &nbsp;&nbsp; 🏷️ {book.tags?.join(", ")}</p>
          <button className="details-button"onClick={() => handleAddToCart(book)}>Add to Cart</button>
        </div>
      </div>
      ))}
  </div>
  );
};

export default Categories;
