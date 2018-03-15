import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';
import { ListGroup, ListGroupItem, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import { Field } from 'redux-form';
import Input from './input';

class Category extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: false
    };

    this.handleBarClick = this.handleBarClick.bind(this);
  }

  handleBarClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleMainCheck(event) {
    event.stopPropagation();
    console.log(event.target);
  }

  handleCheck() {}

  renderSubCategories(subCategory) {
    return (
      <ListGroupItem
        bsSize="small"
        key={subCategory.category_id}
        className={'categoryElement ' + (this.state.expanded ? '' : 'hidden')}
      >
        <div className="subcategory">
          <Field
            name={`categories.${subCategory.category_id}`}
            id={subCategory.category_id}
            component="input"
            type="checkbox"
          />
          <label htmlFor="subCategory">{subCategory.category_name}</label>
        </div>
      </ListGroupItem>
    );
  }

  renderMainCheckBox() {
    const { category_id, category_name } = this.props.category.main_category;
    return (
      <div>
        <Field
          onClick={this.handleMainCheck}
          name={`categories.${category_id}`}
          id={category_id}
          component="input"
          type="checkbox"
        />
        <label htmlFor="mainCategory" onClick={this.handleMainCheck}>
          {category_name}
        </label>
      </div>
    );
  }

  render() {
    return (
      <ListGroup bsSize="small" className="col-xs-12">
        <ListGroupItem
          bsClass="categoryElement"
          bsSize="small"
          onClick={this.handleBarClick}
        >
          {this.renderMainCheckBox()}
        </ListGroupItem>
        {_.map(
          this.props.category.subcategories,
          this.renderSubCategories.bind(this)
        )}
      </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories
  };
}

export default connect(mapStateToProps, { fetchCategories })(Category);
