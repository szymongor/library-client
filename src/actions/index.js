import axios from 'axios';

export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const ROOT_URL = 'http://157.158.16.217:8000';

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchBooks(props) {
  console.log('Fetch books: ', props);
  const config = {
    headers: { 'content-type': 'application/json' }
  };
  const query = formToQueryAdapter(props);
  const request = axios.post(`${ROOT_URL}/books`, query, config);

  return {
    type: FETCH_BOOKS,
    payload: request
  };
}

export function searchBooks(props) {
  return {
    type: SEARCH_BOOKS,
    payload: props
  };
}

function formToQueryAdapter(formProps) {
  const query = {
    query: {
      categories: [],
      filters: {
        signature_ms__contains: '',
        isbn_issn__contains: '',
        signature_bg__contains: '',
        responsibility__contains: '',
        title__contains: '',
        volume__contains: '',
        year__contains: ''
      },
      pagination: { limit: 10, offset: 0 }
    }
  };
  if (formProps) {
    if (formProps.title) query.query.filters.title__contains = formProps.title;
    if (formProps.year) query.query.filters.year__contains = formProps.year;
    if (formProps.categories) {
      query.query.categories.push(formProps.categories);
    }
  }

  return query;
}
