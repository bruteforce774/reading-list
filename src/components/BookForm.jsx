import { useActionState } from 'react';

function BookForm({ onAddBook, bookToEdit, onCancelEdit }) {
  // React 19's useActionState hook handles form submission and pending states
  // First argument is the action function, second is the initial state
  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: null,
  });

  // Form action - receives previous state and FormData automatically
  async function handleSubmit(prevState, formData) {
    // Extract form values using FormData API
    const title = formData.get('title')?.trim();
    const author = formData.get('author')?.trim();
    const total = formData.get('total');
    const unit = formData.get('unit');

    // Validation
    if (!title || !author || !total) {
      return { error: 'All fields are required' };
    }

    const totalNum = parseInt(total, 10);
    if (isNaN(totalNum) || totalNum <= 0) {
      return { error: 'Total must be a positive number' };
    }

    // Create book object
    const book = {
      id: bookToEdit?.id || crypto.randomUUID(),
      title,
      author,
      total: totalNum,
      unit,
      currentProgress: bookToEdit?.currentProgress || 0,
      createdAt: bookToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Call the parent's callback
    onAddBook(book);

    // Return success state (clears the error)
    return { error: null };
  }

  return (
    <div className="book-form">
      <h2>{bookToEdit ? 'Edit Book' : 'Add a Book'}</h2>

      {/* React 19: action prop accepts a function */}
      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={bookToEdit?.title || ''}
            required
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={bookToEdit?.author || ''}
            required
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="total">Total</label>
          <input
            type="number"
            id="total"
            name="total"
            min="1"
            defaultValue={bookToEdit?.total || ''}
            required
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            name="unit"
            defaultValue={bookToEdit?.unit || 'pages'}
            disabled={isPending}
          >
            <option value="pages">Pages</option>
            <option value="chapters">Chapters</option>
          </select>
        </div>

        {state.error && (
          <div className="error-message">{state.error}</div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : bookToEdit ? 'Update Book' : 'Add Book'}
          </button>

          {bookToEdit && (
            <button type="button" onClick={onCancelEdit} disabled={isPending}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
