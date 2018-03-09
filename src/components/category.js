import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';

function renderSubCategories(subCategory) {
  return (
    <ListGroupItem
      bsSize="small"
      key={subCategory.category_id}
      className="col-xs-12 "
    >
      {subCategory.category_name}
    </ListGroupItem>
  );
}

function catOnClick() {
  console.log('lol');
}

const Category = props => {
  return (
    <ListGroup bsSize="small" className="col-xs-12">
      <ListGroupItem bsSize="small" onClick={catOnClick}>
        {props.category.main_category.category_name}
      </ListGroupItem>
      {_.map(props.category.subcategories, renderSubCategories)}
    </ListGroup>
  );
};

export default Category;
