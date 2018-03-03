import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { pickHTMLProps } from 'pick-react-known-prop';
import { searchBooks } from '../actions/index';

class SearchBooks extends Component {
  render() {
    const { fields: { title, categories, year }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.props.searchBooks)}>
        <h3>Search Books</h3>
        <div className="form-group">
          <label>Title</label>
          <input
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
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'SearchBooksForm',
    fields: ['title', 'categories', 'year']
  },
  null,
  { searchBooks }
)(SearchBooks);
