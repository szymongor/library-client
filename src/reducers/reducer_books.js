import {
  SEARCH_BOOKS,
  FETCH_BOOKS,
  FETCH_NEW_BOOKS,
  FETCH_BOOK
} from '../actions/index';

const INITIAL_STATE = { filters: [], books: {}, categories: [], book: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return { ...state, filters: action.payload };
    case FETCH_BOOKS:
      return {
        ...state,
        books: {
          ...state.books,
          ...action.payload.data.reduce(indexBySignatureMs, {})
        }
      };
    case FETCH_NEW_BOOKS:
      return {
        ...state,
        books: {
          ...action.payload.data.reduce(indexBySignatureMs, {})
        }
      };
    case FETCH_BOOK:
      return { ...state, book: action.payload.data[0] };
    default:
      return state;
  }
}

function indexBySignatureMs(acumulator, obj) {
  acumulator[obj.signature_ms] = obj;
  return acumulator;
}
