import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesList from './categories_list';
import { Link } from 'react-router';
import { fetchBooks } from '../actions/index';

class Books extends Component {
  componentWillMount() {
    console.log('Books: ', this.props.filters);
    this.props.fetchBooks(this.props.filters);
  }

  renderBooks() {
    return this.props.books.map(book => {
      return (
        <Link
          to={'books/' + book.signature_ms}
          key={book.signature_ms}
          className="list-group-item"
        >
          <strong>{book.signature_ms} </strong>
          <span className="pull-xs-right">{book.title}</span>
        </Link>
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
  return {
    books: state.books.books,
    filters: state.books.filters
  };
}

export default connect(mapStateToProps, { fetchBooks })(Books);
