import { combineReducers } from 'redux';
import CategoriesReducer from './reducer_categories';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  form: formReducer
});

export default rootReducer;
