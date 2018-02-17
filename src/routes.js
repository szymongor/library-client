import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Books from './components/books';
import CategoriesList from './components/categories_list';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CategoriesList} />
  </Route>
);
