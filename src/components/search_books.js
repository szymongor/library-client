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
import '../styles/search_books.css';

const FIELDS_CLASSES = 'col-xs-12 col-md-6 ';
const NAV_ITEM_CLASS = 'col-xs-6 tabs-cards';

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
    options: ['podręcznik', 'inny', 'zbiór zadań']
  },
  availability: {
    type: 'select',
    fieldType: 'text',
    label: 'Dostępność',
    classes: FIELDS_CLASSES,
    options: ['dostępna', 'wypożyczona', 'czytelnia']
  }
};

class SearchBooks extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchCategories();
  }

  onSubmit(props) {
    this.props.searchBooks(props);
    this.context.router.push('booklist');
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
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav className="" bsStyle="tabs">
                <NavItem className={NAV_ITEM_CLASS} eventKey="first">
                  Dane książki
                </NavItem>
                <NavItem className={NAV_ITEM_CLASS} eventKey="second">
                  Kategorie
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <div className="-searchForm">
                    {_.map(FIELDS, this.renderField.bind(this))}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <div className="-searchForm">
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
        <div className="btn-group pull-right col-md-offset-6 col-md-6 col-xs-12 buttons-sticky">
          <Link to="/" className="btn-cancel col-md-6 col-xs-6">
            <span className="glyphicon glyphicon-remove" /> Anuluj
          </Link>
          <button type="submit" className="col-md-6 col-xs-6 btn-search">
            <span className="glyphicon glyphicon-search" /> Szukaj
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
