// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './components/Dashboard';
import AddUser from './pages/AddUser';
import UserList from './components/UserList';
import AddBook from './pages/Book/AddBook'; 
import Book from './pages/Book/Book'; 
import Index from './pages/index'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    // Wrap the entire application with ThemeProvider
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/book/book" element={<Book />} />
            <Route path="/book/addbook" element={<AddBook />} /> {/* Fixed path for AddBook */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
