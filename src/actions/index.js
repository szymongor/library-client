import axios from 'axios';

export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const ROOT_URL = 'http://157.158.16.217:8000';

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function searchBooks(props) {
  const query = {
    query: {
      categories: [],
      filters: {
        signature_ms__contains: '',
        isbn_issn__contains: '',
        signature_bg__contains: '',
        responsibility__contains: '',
        title__contains: 'Prezentacja Projektu INŻ',
        volume__contains: '',
        year__contains: ''
      },
      pagination: { limit: 50, offset: 0 }
    }
  };
  const request = axios.post(`${ROOT_URL}/books`, query);

  return {
    type: SEARCH_BOOKS,
    payload: request
  };
}
