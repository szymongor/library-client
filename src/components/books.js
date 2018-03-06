import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesList from './categories_list';
import { Link } from 'react-router';
import { searchBooks } from '../actions/index';

class Books extends Component {
  componentWillMount() {
    this.props.searchBooks();
  }

  renderBooks() {
    return this.props.books.map(book => {
      return (
        <li className="list-group-item" key={book.signature_ms}>
          <strong>{book.signature_ms} </strong>
          <span className="pull-xs-right">{book.title}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-right">
          <Link to="search" className="btn btn-primary">
            Search
          </Link>
        </div>
        List of books:
        <ul>{this.renderBooks()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.books };
}

export default connect(mapStateToProps, { searchBooks })(Books);
