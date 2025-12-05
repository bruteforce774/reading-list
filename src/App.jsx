import { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

const STORAGE_KEY = 'reading-list-books';

function App() {
  // Use lazy initializer to load from localStorage only once on mount
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored books:', error);
        return [];
      }
    }
    return [];
  });

  const [editingBook, setEditingBook] = useState(null);

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  function handleAddBook(book) {
    if (editingBook) {
      // Update existing book
      setBooks(books.map(b => b.id === book.id ? book : b));
      setEditingBook(null);
    } else {
      // Add new book
      setBooks([...books, book]);
    }
  }

  function handleEditBook(book) {
    setEditingBook(book);
    // Scroll to top so user can see the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDeleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== id));
      if (editingBook?.id === id) {
        setEditingBook(null);
      }
    }
  }

  function handleCancelEdit() {
    setEditingBook(null);
  }

  return (
    <div className="app">
      <h1>My Reading List</h1>

      <BookForm
        onAddBook={handleAddBook}
        bookToEdit={editingBook}
        onCancelEdit={handleCancelEdit}
      />

      <BookList
        books={books}
        onEditBook={handleEditBook}
        onDeleteBook={handleDeleteBook}
      />
    </div>
  );
}

export default App;