import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookItem from './BookItem';

/**
 * @description Renders a collection of books for the given search results
 * @param {object} props
 */
const renderSearchResults = ({ searchResults, myReads, availableShelves, moveToShelf }) => {
  if (searchResults && !searchResults.length) {
    return <h2 className="no-results">No results found</h2>;
  }

  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {
          searchResults.map(book => {
            const isInMyReads = myReads.find(myBook => myBook.id === book.id)
            return <BookItem
              key={`book_id_${book.id}`}
              book={book}
              shelf={isInMyReads && isInMyReads.shelf}
              availableShelves={availableShelves}
              onShelfChange={moveToShelf}
            />
          })
        }
      </ol>
    </div>
  );
};

/**
 * @description View containing a search bar and search results
 * @param {object} props
 */
const SearchBooks = (props) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">Close</Link>
      <div className="search-books-input-wrapper">
        <input
          onChange={props.onSearch}
          type="text"
          placeholder="Search by title or author"
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {renderSearchResults(props)}
      </ol>
    </div>
  </div>
);

SearchBooks.propTypes = {
  searchResults: PropTypes.array.isRequired,
  myReads: PropTypes.array.isRequired,
  availableShelves: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  moveToShelf: PropTypes.func.isRequired
};

export default SearchBooks;