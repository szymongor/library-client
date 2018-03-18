import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Books from './components/books';
import SearchBooks from './components/search_books';
import BookShow from './components/book_show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Books} />
    <Route path="booklist" component={Books} />
    <Route path="search" component={SearchBooks} />
    <Route path="booklist/:syg_ms" component={BookShow} />
  </Route>
);
