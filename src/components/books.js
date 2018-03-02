import React from 'react';
import CategoriesList from './categories_list';
import { Link } from 'react-router';

export default () => {
  return (
    <div>
      <div className="text-right">
        <Link to="search" className="btn btn-primary">
          Search
        </Link>
      </div>
      List of books.
    </div>
  );
};
