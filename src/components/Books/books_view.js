import React, { Component } from 'react';
import { Link } from 'react-router';

class BooksView extends Component {
  renderBooks() {
    let books = this.props.booksData;
    if (books.length) {
      return books.map(book => {
        return (
          <Link
            to={'booklist/' + book.signature_ms}
            key={book.signature_ms}
            className="list-group-item"
          >
            <span>
              <b>{book.title}</b>
            </span>
            <br />
            <span>{book.responsibility}</span>
            <br />
            <span>{book.year}</span>
          </Link>
        );
      });
    } else {
      return <div>Brak książek</div>;
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn-cancel col-md-4 col-xs-6">
          <span className="glyphicon glyphicon-remove" /> Anuluj
        </Link>
        <Link
          to="search"
          className="col-md-offset-4 col-md-4 col-xs-6 btn-search"
        >
          <span className="glyphicon glyphicon-search" /> Szukaj
        </Link>
        <h3 className="col-xs-6">Wyniki wyszukiwania</h3>

        <div className="col-xs-12">
          <ul>{this.renderBooks()}</ul>
        </div>
      </div>
    );
  }
}

export default BooksView;
