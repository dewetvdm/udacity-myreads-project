import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Renders a list of authors
 * @param {array} authors
 */
const renderAuthors = authors => authors && authors.map(author => <div key={author} className="book-authors">{author}</div>);

/**
 * @description Renders a select component with the given available options
 * @param {object} book
 * @param {string} currentShelf
 * @param {array} availableShelves
 * @param {function} onShelfChange
 */
const renderShelfSelector = (book, currentShelf, availableShelves, onShelfChange) => {
  const options = availableShelves.map(shelf =>
    <option
      key={shelf.value}
      value={shelf.value}
    >
      {shelf.label}
    </option>
  );

  return (
    <select
      value={currentShelf || 'moveTo'}
      onChange={(e) => onShelfChange(book, e.target.value)}
    >
      <option value="moveTo" disabled>Move to...</option>
      {options}
    </select>
  );
};

/**
 * @description Represents a book
 * @param {object} props
 */
const BookItem = ({ book, shelf, availableShelves, onShelfChange }) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
          {renderShelfSelector(book, shelf, availableShelves, onShelfChange)}
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {renderAuthors(book.authors)}
    </div>
  </li>
);

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  availableShelves: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
};

export default BookItem;