// src/api.js
import axios from 'axios';

const API_URL = 'https://bookstorebackend-apim.onrender.com'; // NestJS API base URL

// Set up axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // Only needed if handling cookies or sessions
});

// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to create a user
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
// Function to fetch books by subject (category)
export const getBooksBySubject = async (subject) => {
  try {
    const response = await api.get(`/books/subject/${subject}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books by subject:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch all books
export const getAllBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


export const getBookByID = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw error;
  }
};





// Function to create a book
export const createBook = async (bookData) => {
  try {
    const response = await api.post('/books', bookData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// Function to update a book by ID
export const updateBook = async (bookId, updateData) => {
  try {
    const response = await api.put(`/books/${bookId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};
// Delete function by Id
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};

export const createAddCard = async (cardData) => {
  try {
    const response = await api.post(`/addCard`, cardData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating card item:', error);
    throw error;
  }
};

export const getAllAddCards = async () => {
  try {
    const response = await api.get(`/addCard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching card items:', error);
    throw error;
  }
};

// Get a single card item by ID
export const getAddCardById = async (id) => {
  try {
    const response = await axios.get(`/addCard/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching card with id ${id}:`, error);
    throw error;
  }
};

// Update a card item by ID
export const updateAddCard = async (id, updatedData) => {
  try {
    const response = await axios.put(`/addCard/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating card with id ${id}:`, error);
    throw error;
  }
};

// Delete a card item by ID
export const deleteAddCard = async (id) => {
  try {
    const response = await api.delete(`/addCard/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data; // Should include access_token
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to sign up a new user
export const signupUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};



api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set the token in headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getUniqueBookSubjects = async () => {
  try {
    const response = await api.get(`/books/subject`);
    return response.data;
  } catch (error) {
    console.error('Error fetching unique book subjects:', error);
    throw error;
  }
};





