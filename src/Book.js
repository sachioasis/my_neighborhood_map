import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  modifyShelf = event => {
    this.props.onModifyBookShelf(this.props.book, event);
  };

  render() {
    let bookThumbnail =
      "https://images.immediate.co.uk/volatile/sites/3/2017/11/imagenotavailable1-39de324.png?quality=90&resize=620,413";
    if (this.props.book.imageLinks !== undefined) {
      bookThumbnail = this.props.book.imageLinks.thumbnail;
    }

    let authors = "Authors Unknown";
    if (this.props.book.authors !== undefined) {
      authors = this.props.book.authors.join(", ");
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${bookThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf}
                onChange={event => this.modifyShelf(event)}
              >
                <option value="move" disabled>
                  {" "}
                  Move to...{" "}
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onModifyBookShelf: PropTypes.func.isRequired
};

export default Book;
