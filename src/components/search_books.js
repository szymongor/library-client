import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { searchBooks, fetchCategories } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Category from './category';
import Input from './input';

const FIELDS_CLASSES = 'col-xs-12 col-md-6 ';

const FIELDS = {
  syg_ms: {
    type: 'input',
    fieldType: 'number',
    label: 'Sygnatura ms',
    classes: FIELDS_CLASSES
  },
  syg_bg: {
    type: 'input',
    fieldType: 'text',
    label: 'Sygnatura biblioteki głównej',
    classes: FIELDS_CLASSES
  },
  author: {
    type: 'input',
    fieldType: 'text',
    label: 'Autor/ Redaktor',
    classes: FIELDS_CLASSES
  },
  title: {
    type: 'input',
    fieldType: 'text',
    label: 'Tytuł',
    classes: FIELDS_CLASSES
  },
  volume: {
    type: 'input',
    fieldType: 'text',
    label: 'Tom',
    classes: FIELDS_CLASSES
  },
  year: {
    type: 'input',
    fieldType: 'number',
    label: 'Rok',
    classes: FIELDS_CLASSES
  },
  type: {
    type: 'select',
    fieldType: 'text',
    label: 'Typ pozycji',
    classes: FIELDS_CLASSES,
    options: ['A', 'B', 'C']
  },
  availability: {
    type: 'select',
    fieldType: 'text',
    label: 'Dostępność',
    classes: FIELDS_CLASSES,
    options: ['D', 'E', 'F', 'G']
  }
};

class SearchBooks extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    console.log(this.props.initialValues);
    this.props.fetchCategories();
  }

  onSubmit(props) {
    console.log(props);
    this.props.searchBooks(props);
    this.context.router.push('books');
  }

  renderField(fieldConfig, field) {
    return (
      <div
        className={`form-group ` + fieldConfig.classes}
        key={fieldConfig.label}
      >
        <h4>{fieldConfig.label}</h4>
        <Field
          className="col-xs-12"
          name={field}
          component={Input}
          componentClass={fieldConfig.type}
          type={fieldConfig.fieldType}
          placeholder={fieldConfig.label}
          options={'' || fieldConfig.options}
        />
      </div>
    );
  }

  renderCategorySelect(category) {
    return (
      <Category category={category} key={category.main_category.category_id} />
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Wyszukaj Książki</h3>
        <Tab.Container id="left-tabs-example" defaultActiveKey="second">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem className="col-xs-6" eventKey="first">
                  Dane książki
                </NavItem>
                <NavItem className="col-xs-6" eventKey="second">
                  Kategorie
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <div className="searchForm">
                    {_.map(FIELDS, this.renderField.bind(this))}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <div className="searchForm">
                    {_.map(
                      this.props.categories,
                      this.renderCategorySelect.bind(this)
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        <div className="btn-group pull-right col-md-offset-6 col-md-6">
          <Link to="/" className="btn-cancel col-md-6 col-xs-6">
            Anuluj
          </Link>
          <button type="submit" className="col-md-6 col-xs-6">
            Szukaj
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    initialValues: {
      ...state.books.filters
    }
  };
}

SearchBooks = reduxForm({
  form: 'searchBooksForm'
})(SearchBooks);

export default connect(mapStateToProps, { searchBooks, fetchCategories })(
  SearchBooks
);
