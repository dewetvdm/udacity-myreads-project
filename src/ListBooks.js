import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookItem from './BookItem';
import Header from './Header';

/**
 * @description Renders a collection of books for the given shelf
 * @param {array} books
 * @param {string} shelf
 * @param {array} availableShelves
 * @param {function} moveToShelf
 */
const renderBooks = (books, shelf, availableShelves, moveToShelf) => {
  return books
    .filter(book => book.shelf === shelf)
    .map(book => (
      <BookItem
        key={`${book.shelf}_book_id_${book.id}`}
        book={book}
        shelf={book.shelf}
        availableShelves={availableShelves}
        onShelfChange={moveToShelf}
      />
    ));
};

/**
 * @description Renders a collection of shelves with books for the given list of shelves
 * @param {object} props
 */
const renderShelves = ({ books, availableShelves, moveToShelf }) => {
  return availableShelves.map(shelf => (
    <div key={shelf.value} className="bookshelf">
      <h2 className="bookshelf-title">{shelf.label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {renderBooks(books, shelf.value, availableShelves, moveToShelf)}
        </ol>
      </div>
    </div>
  ));
};

/**
 * @description View containing shelves with books
 * @param {object} props
 */
const ListBooks = (props) => (
  <div className="list-books">
    <Header title={'iREAD'} />
    <div className="list-books-content">
      {renderShelves(props)}
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  availableShelves: PropTypes.array.isRequired,
  moveToShelf: PropTypes.func.isRequired
};

export default ListBooks;
