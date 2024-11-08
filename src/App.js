// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Dashboard';
import AddUser from './pages/admin/AddUser';
import UserList from './components/UserList';
import AddBook from './pages/Book/AddBook';
import Book from './pages/Book/Book';
import AllCategoriesPage from './pages/Book/AllCategoriesPage';
import Index from './pages/index';
import SignIn from './pages/SignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateUser from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import BookStore from './components/BookStore'; 
import Categorie from './pages/Book/Categorie';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("See All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          {/* Main Layout */}
          <Route
            element={
              <MainLayout 
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory} 
              />
            }
          >
            <Route path="/" element={<Index />} />
            <Route path="/bookstore" element={<BookStore selectedCategory={selectedCategory} />} />
            <Route path="/book/allcategoriespage" element={<AllCategoriesPage selectedCategory={selectedCategory} />} />
            
            {/* Dynamic route for category pages */}
            <Route path="/book/categorie/:category" element={<Categorie />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<CreateUser />} />
          </Route>

          {/* Admin Layout protected by ProtectedRoute */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="users" element={<UserList />} />
            <Route path="book/book" element={<Book />} />
            <Route path="book/addbook" element={<AddBook />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
