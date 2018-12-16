import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        {this.props.cat === "currentlyReading" ? (
          <h2 className="bookshelf-title">Currently Reading</h2>
        ) : this.props.cat === "wantToRead" ? (
          <h2 className="bookshelf-title">Want to Read</h2>
        ) : (
          <h2 className="bookshelf-title">Read</h2>
        )}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter(book => book.shelf === this.props.cat)
              .map(book => (
                <Book
                  key={book.id}
                  book={book}
                  onModifyBookShelf={this.props.onModifyBookShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  cat: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onModifyBookShelf: PropTypes.func.isRequired
};

export default BookShelf;