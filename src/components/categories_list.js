import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';

class CategoriesList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }
  render() {
    return <div>List of Categories</div>;
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchCategories }, dispatch);
// }

export default connect(null, { fetchCategories })(CategoriesList);
