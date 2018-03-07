import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { pickHTMLProps } from 'pick-react-known-prop';
import { searchBooks } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Tytuł'
  },
  categories: {
    type: 'input',
    label: 'Kategorie'
  },
  year: {
    type: 'input',
    label: 'Rok'
  }
};

class SearchBooks extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log('SearchBooks: ', props);
    this.props.searchBooks(props);
    this.context.router.push('books');
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];
    return (
      <div
        className={`form-group ${
          fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''
        }`}
        key={fieldConfig.label}
      >
        <label>{fieldConfig.label}</label>
        <fieldConfig.type
          type="text"
          className="form-control"
          {...pickHTMLProps(fieldHelper)}
        />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Search Books</h3>

        {_.map(FIELDS, this.renderField.bind(this))}

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
  _.each(FIELDS, field => {
    //console.log(field);
  });
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
    fields: _.keys(FIELDS),
    validate
  },
  mapStateToProps,
  { searchBooks }
)(SearchBooks);
