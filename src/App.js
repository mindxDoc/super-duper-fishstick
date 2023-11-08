// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookList from './pages/books/BookList';
import BookCreate from './pages/books/BookCreate';
import BookEdit from './pages/books/BookEdit';
import BookShow from './pages/books/BookShow';
import PRDPage from './pages/PRDPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prd" element={<PRDPage />} />
        <Route exact path='/' element={<BookList />} />
        <Route path="/create" element={<BookCreate />} />
        <Route path="/edit/:id" element={<BookEdit />} />
        <Route path="/show/:id" element={<BookShow />} />
      </Routes>
    </Router>
  );
}

export default App;
