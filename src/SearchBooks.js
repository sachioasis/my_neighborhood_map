import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends Component {
  state = {
    query: "",
    books: []
  };

  updateQuery = query => {
    this.setState({ query: query.trim() }, () => {
      if (this.state.query !== "") {
        BooksAPI.search(this.state.query).then(res => {
          if (res.error) {
            this.setState({ books: [] });
          } else {
            for (let book of res) {
              for (let sBook of this.props.booksInShelf) {
                if (book.id === sBook.id) {
                  book.shelf = sBook.shelf;
                  break;
                } else {
                  book.shelf = "none";
                }
              }
            }
            this.setState({ books: res });
          }
        });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  modifyShelf = (book, event) => {
    this.props
      .onModifyBookShelf(book, event)
      .then(books => this.updateBooks(books));
  };

  updateBooks(books) {
    for (let book of this.state.books) {
      for (let sBook of books) {
        if (book.id === sBook.id) book.shelf = sBook.shelf;
      }
    }
    this.setState({ books: this.state.books });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <Book
                key={book.id}
                book={book}
                onModifyBookShelf={this.modifyShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  booksInShelf: PropTypes.array.isRequired,
  onModifyBookShelf: PropTypes.func.isRequired
};

export default SearchBooks;
