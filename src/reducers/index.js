import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import BooksReducer from './reducer_books';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  books: BooksReducer,
  form: formReducer
});

export default rootReducer;
