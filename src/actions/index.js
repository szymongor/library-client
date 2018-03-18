import axios from 'axios';
import _ from 'lodash';

export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BOOK = 'FETCH_BOOK';

const ROOT_URL = 'http://157.158.16.217:8000';

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchBooks(props) {
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

export function fetchBook(id) {
  const config = {
    headers: { 'content-type': 'application/json' }
  };
  const query = formToQueryAdapter({ syg_ms: id });
  const request = axios.post(`${ROOT_URL}/books`, query, config);
  return {
    type: FETCH_BOOK,
    payload: request
  };
}

function formToQueryAdapter(formProps) {
  const query = {
    query: {
      categories: [],
      filters: {
        signature_ms: '',
        isbn_issn__contains: '',
        signature_bg__contains: '',
        responsibility__contains: '',
        title__contains: '',
        volume__contains: '',
        year__contains: '',
        type__contains: '',
        availability__contains: ''
      },
      pagination: { limit: 10, offset: 0 }
    }
  };
  if (formProps) {
    if (formProps.syg_ms)
      query.query.filters.signature_ms = String(formProps.syg_ms);
    if (formProps.syg_bg)
      query.query.filters.signature_bg__contains = formProps.syg_bg;
    if (formProps.author)
      query.query.filters.responsibility__contains = formProps.author;
    if (formProps.title) query.query.filters.title__contains = formProps.title;
    if (formProps.volume)
      query.query.filters.volume__contains = formProps.volume;
    if (formProps.year)
      query.query.filters.year__contains = String(formProps.year);
    if (formProps.type) query.query.filters.type__contains = formProps.type;
    if (formProps.availability)
      query.query.filters.availability__contains = formProps.availability;
    if (formProps.categories) {
      query.query.categories = formCategoriesToArray(formProps.categories);
    }
  }

  return query;
}

function formCategoriesToArray(formCategories) {
  let categories = _.map(formCategories, (isSelected, category_id) => {
    return category_id;
  });
  return categories;
}
