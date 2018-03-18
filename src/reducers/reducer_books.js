import { SEARCH_BOOKS, FETCH_BOOKS, FETCH_BOOK } from '../actions/index';

const INITIAL_STATE = { filters: [], books: [], categories: [], book: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return { ...state, filters: action.payload };
    case FETCH_BOOKS:
      return { ...state, books: action.payload.data };
    case FETCH_BOOK:
      return { ...state, book: action.payload.data[0] };
    default:
      return state;
  }
}
