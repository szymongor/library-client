import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchBooks } from '../actions/index';

const PAGE_SIZE = 20;

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
      console.log(Object.entries(this.props.books).length, 'Page: ', page);
      this.loading = true;
      page++;
      this.props.fetchBooks(this.props.filters, page);
      setTimeout(() => {
        this.loading = false;
      }, 200);
    }
  }

  getBooksArrayFromStore() {
    let booksArray = [];
    for (let book in this.props.books) {
      booksArray.push(this.props.books[book]);
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

  renderBooks() {
    // && Array.isArray(this.props.books)
    if (this.props.books) {
      let booksArray = this.getBooksArrayFromStore();
      return booksArray.map(book => {
        return (
          <Link
            to={'booklist/' + book.signature_ms}
            key={book.signature_ms}
            className="list-group-item"
          >
            <span>
              <b>{book.title}</b>
            </span>
            <br />
            <span>{book.responsibility}</span>
            <br />
            <span>{book.year}</span>
          </Link>
        );
      });
    } else {
      return [];
    }
  }

  render() {
    return (
      <div>
        <Link
          to="search"
          className="col-md-offset-8 col-md-4 col-xs-12 btn-search"
        >
          <span className="glyphicon glyphicon-search" /> Szukaj
        </Link>
        <h3 className="col-xs-6">Wyniki wyszukiwania</h3>

        <div className="col-xs-12">
          <ul>{this.renderBooks()}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    filters: state.books.filters
  };
}

export default connect(mapStateToProps, { fetchBooks })(Books);
