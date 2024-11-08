import React, { useState } from 'react';
import Header from './Header';
import Categories from './Categories';

const BookStore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Header onCategorySelect={setSelectedCategory} />
      <Categories selectedCategory={selectedCategory} />
    </div>
  );
};

export default BookStore;
