import axios from 'axios';

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

export function searchBooks() {}
