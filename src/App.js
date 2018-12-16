import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks.js";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(loadedBooks => {
      this.setState({
        books: loadedBooks
      });
    });
  }

  modifyBookShelf = (book, event) => {
    return new Promise(resolve => {
      BooksAPI.update(book, event.target.value).then(res => {
        BooksAPI.getAll().then(res => {
          this.setState({ books: res }, resolve(res));
        });
      });
    });
  };

  render() {
    let books = this.state.books;
    let categories = ["currentlyReading", "wantToRead", "read"];

    return (
      <div className="app">
        <Route
          path="/search"
          exact
          render={() => (
            <SearchBooks
              booksInShelf={books}
              onModifyBookShelf={this.modifyBookShelf}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {categories.map(cat => (
                    <BookShelf
                      key={cat}
                      cat={cat}
                      books={books}
                      onModifyBookShelf={this.modifyBookShelf}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
