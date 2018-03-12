import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';
import { ListGroup, ListGroupItem, FormGroup, Checkbox } from 'react-bootstrap';
import _ from 'lodash';

class Category extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  renderSubCategories(subCategory) {
    return (
      <ListGroupItem
        bsSize="small"
        key={subCategory.category_id}
        className={this.state.expanded ? 'hidden' : ''}
      >
        <Checkbox inline>{subCategory.category_name}</Checkbox>
      </ListGroupItem>
    );
  }

  render() {
    return (
      <ListGroup bsSize="small" className="col-xs-12">
        <ListGroupItem bsSize="small" onClick={this.handleClick}>
          <Checkbox inline>
            {this.props.category.main_category.category_name}
          </Checkbox>
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
    // initialValues: {
    //   ...state.books.filters
    // }
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchCategories }, dispatch);
// }

export default connect(mapStateToProps, { fetchCategories })(Category);
