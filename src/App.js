import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import Header from './Header';
import ListBooks from './ListBooks';
class BooksApp extends Component {
  static defaultProps = {
    shelves: [
      {
        value: 'currentlyReading',
        label: 'Currently Reading'
      },
      {
        value: 'wantToRead',
        label: 'Want to Read'
      },
      {
        value: 'read',
        label: 'Read'
      }
    ]
  };

  state = {
    myReads: [],
    searchResults: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    this.getMyReads();
  };

  /**
  /**
   * @description Update the shelf value of the given book to the specified shelf
   * @param {object} book
   * @param {string} shelf
   */
  moveToShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(response => {
        const hasShelf = book.shelf;
        const myReads = this.state.myReads.slice();
        book.shelf = shelf;
        if (!hasShelf) {
          myReads.push(book);
        }
        this.setState({ myReads });
      })
      .catch(console.error);
  };

   * @description Retrieves a list of books via the BooksAPI pertaining to the user
   */
  getMyReads() {
    BooksAPI
      .getAll()
      .then(myReads => {
        this.setState({
          myReads,
          loading: false,
          error: null
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false,
          error: 'Ah snap! Someone forgot to pay the electricity bill again...'
        });
      })
  };

  render() {
    if (this.state.loading || this.state.error) {
      return <Header title={this.state.error || 'Loading...'} />;
    }

    return (
      <div className="app">
        <Route
          exact path='/'
          render={() => (
            <ListBooks
              books={this.state.myReads}
              availableShelves={this.props.shelves}
              moveToShelf={this.moveToShelf}
            />
          )}
        />
      </div>
    )
  }
}
};

export default BooksApp
export default BooksApp;
