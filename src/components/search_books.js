import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { pickHTMLProps } from 'pick-react-known-prop';
import { searchBooks } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SearchBooks extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log('SearchBooks: ', props);
    this.props.searchBooks(props);
    this.context.router.push('books');
  }

  render() {
    const { fields: { title, categories, year }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Search Books</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            name="filter.title__contains"
            type="text"
            className="form-control"
            {...pickHTMLProps(title)}
          />
        </div>

        <div className="form-group">
          <label>categories</label>
          <input
            type="text"
            className="form-control"
            {...pickHTMLProps(categories)}
          />
        </div>

        <div className="form-group">
          <label>year</label>
          <input
            type="text"
            className="form-control"
            {...pickHTMLProps(year)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate() {
  const errors = {};
  return errors;
}

function mapStateToProps(state) {
  return {
    initialValues: {
      title: state.books.filters.title
    }
  };
}

export default reduxForm(
  {
    form: 'SearchBooksForm',
    fields: ['title', 'categories', 'year'],
    validate
  },
  mapStateToProps,
  { searchBooks }
)(SearchBooks);
