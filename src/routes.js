import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Books from './components/books';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Books} />
  </Route>
);
