import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';
import { ListGroup, ListGroupItem, FormGroup, Checkbox } from 'react-bootstrap';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';

const renderField = field => (
  <div className="input-row">
    <input {...field.input} type="text" />
    {field.meta.touched &&
      field.meta.error && <span className="error">{field.meta.error}</span>}
  </div>
);

class Category extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: false
      //mainSelected: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleMainCheck(event) {}

  renderSubCategories(subCategory) {
    return (
      <ListGroupItem
        bsSize="small"
        key={subCategory.category_id}
        className={this.state.expanded ? '' : 'hidden'}
      >
        <Checkbox inline>{subCategory.category_name}</Checkbox>
      </ListGroupItem>
    );
  }

  renderMainCheckBox() {
    // let checkBox = (
    //   <Checkbox inline onChange={this.handleMainCheck.bind(this)}>
    //     {this.props.category.main_category.category_name}
    //   </Checkbox>
    // );
    return (
      <div>
        <Field
          name={this.props.category.main_category.category_id}
          component="input"
          type="checkbox"
          placeholder="First Name"
        />
        {this.props.category.main_category.category_name}
      </div>
    );
  }

  render() {
    return (
      <ListGroup bsSize="small" className="col-xs-12">
        <ListGroupItem bsSize="small" onClick={this.handleClick}>
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
