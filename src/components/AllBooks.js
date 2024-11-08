// src/components/AllCategories.js
import React from 'react';
import { createAddCard } from '../api';
import "../allcategories.css";

const AllCategories = ({ book }) => {
  
  const handleAddToCard = async () => {
    const bookData = {
      bookId: book._id,       
      name: book.name,
      price: book.price,
      image: book.image, 
      quantity: 1            
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
    <div className="book-card">
      <img src={book.image || "https://via.placeholder.com/300x200"} alt={book.name} className="book-image" />
      <div className="book-details">
        <p className="price">{book.price ? `$${book.price}` : "Price not available"}</p>
        <p className="title">{book.name}</p>
        <p className="author">by {book.author}</p>
        <p className="info">📚 {book.genre} &nbsp;&nbsp; 🏷️ {book.tags?.join(", ")}</p>
        <button className="details-button" onClick={handleAddToCard}>Add to Cart</button>
      </div>
    </div>
  );
};

export default AllCategories;
