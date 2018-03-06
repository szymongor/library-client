import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Books from './components/books';
import SearchBooks from './components/search_books';
//import CategoriesList from './components/categories_list';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Books} />
    <Route path="books" component={Books} />
    <Route path="search" component={SearchBooks} />
  </Route>
);
