import { SEARCH_BOOKS, FETCH_BOOKS } from '../actions/index';

const INITIAL_STATE = { filters: [], books: [], categories: [], book: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return { ...state, filters: action.payload };
    case FETCH_BOOKS:
      return { ...state, books: action.payload.data };
    default:
      return state;
  }
}
