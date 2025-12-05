function BookList({ books, onEditBook, onDeleteBook }) {
  if (books.length === 0) {
    return (
      <div className="book-list">
        <h2>My Reading List</h2>
        <div className="book-list-empty">
          No books yet. Add your first book above!
        </div>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2>My Reading List</h2>
      {books.map((book) => {
        const progress = (book.currentProgress / book.total) * 100;

        return (
          <div key={book.id} className="book-item">
            <div className="book-header">
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
              </div>
              <div className="book-actions">
                <button
                  className="edit"
                  onClick={() => onEditBook(book)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => onDeleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="progress-info">
              <p className="progress-text">
                {book.currentProgress} / {book.total} {book.unit}
                ({Math.round(progress)}% complete)
              </p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
