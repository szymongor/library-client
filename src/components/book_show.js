import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../actions/index';
import { Link } from 'react-router';

class BookShow extends Component {
  componentWillMount() {
    this.props.fetchBook(this.props.params.syg_ms);
  }
  render() {
    const { book } = this.props;
    if (!book) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <Link className="btn btn-danger" to="/booklist">
          Back
        </Link>
        <h3>{book.title}</h3>
        <h6>{book.signature_ms}</h6>
        <p>{book.responsibility}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { book: state.books.book };
}

export default connect(mapStateToProps, { fetchBook })(BookShow);
