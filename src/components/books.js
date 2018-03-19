import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchBooks } from '../actions/index';

class Books extends Component {
  componentWillMount() {
    this.props.fetchBooks(this.props.filters);
  }

  renderBooks() {
    if (this.props.books && Array.isArray(this.props.books)) {
      return this.props.books.map(book => {
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
      return [];
    }
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <Link to="search" className="btn btn-primary">
            Szukaj
          </Link>
        </div>
        <h3>Wyniki wyszukiwania</h3>
        <ul>{this.renderBooks()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    filters: state.books.filters
  };
}

export default connect(mapStateToProps, { fetchBooks })(Books);
