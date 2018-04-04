import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/index';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';
import { Field } from 'redux-form';
import '../../styles/categories.css';

class Category extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: false
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleMainCheck(e) {
    let targetInput = e.target.getElementsByTagName('input');
    console.log(targetInput);
    if (targetInput.length !== 0) {
      let checkbox = targetInput[0];
      checkbox.click();
    }
    let siblingCheckbox = e.target.previousSibling;
    if (siblingCheckbox && siblingCheckbox.type === 'checkbox') {
      siblingCheckbox.click();
    }
    //check all subcategoires
  }

  handleSubcategoryCheck(e) {
    let targetInput = e.target.getElementsByTagName('input');
    if (targetInput.length !== 0) {
      let checkbox = targetInput[0];
      checkbox.click();
    }
    let siblingCheckbox = e.target.previousSibling;
    if (siblingCheckbox && siblingCheckbox.type === 'checkbox') {
      siblingCheckbox.click();
    }
  }

  renderSubCategories(subCategory) {
    return (
      <ListGroupItem
        bsSize="small"
        key={subCategory.category_id}
        className={'categoryElement ' + (this.state.expanded ? '' : 'hidden')}
        onClick={this.handleSubcategoryCheck}
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
    const { subcategories } = this.props.category;
    return (
      <div>
        <Field
          onClick={this.handleMainCheck}
          name={`categories.${category_id}`}
          id={category_id}
          component="input"
          type="checkbox"
        />
        <label htmlFor="mainCategory">{category_name}</label>
        {this.renderCategoryExpander(subcategories)}
      </div>
    );
  }

  renderCategoryExpander(subcategories) {
    if (subcategories.length) {
      return (
        <div
          className="btn btn-default pull-right categories-expand"
          onClick={this.handleExpandClick}
        >
          <span className="caret" />
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <ListGroup bsSize="small" className="col-xs-12">
        <ListGroupItem
          className="col-xs-12"
          bsClass="categoryElement"
          bsSize="small"
          onClick={this.handleMainCheck}
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
