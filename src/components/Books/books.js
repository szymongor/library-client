import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooks, PAGE_SIZE } from '../../actions/index';
import BooksView from './books_view';

class Books extends Component {
  constructor() {
    super();
    this.endOfResults = false;
    this.loading = false;
  }

  componentWillMount() {
    this.props.fetchBooks(this.props.filters);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      Object.entries(this.props.books).length
    ) {
      this.fetchNewPage();
    }
  };

  fetchNewPage() {
    if (!this.loading && !this.endOfResults) {
      let page = Object.entries(this.props.books).length / PAGE_SIZE;
      //console.log(Object.entries(this.props.books).length, 'Page: ', page);
      this.loading = true;
      page++;
      this.props.fetchBooks(this.props.filters, page);
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  }

  render() {
    return <BooksView booksData={this.props.books} />;
  }
}

function getBooksArrayFromStore(booksHashMap) {
  let booksArray = [];
  for (let book in booksHashMap) {
    booksArray.push(booksHashMap[book]);
  }
  var cmp = function(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  };
  booksArray.sort(function(a, b) {
    return cmp(a.title, b.title) || cmp(a.year, b.year);
  });
  return booksArray;
}

function mapStateToProps(state) {
  return {
    books: getBooksArrayFromStore(state.books.books),
    filters: state.books.filters
  };
}

export default connect(mapStateToProps, { fetchBooks })(Books);
