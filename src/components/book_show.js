import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBook } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';
import '../book_show.css';

class BookShow extends Component {
  componentWillMount() {
    this.props.fetchBook(this.props.params.syg_ms);
  }

  renderElement(label, content) {
    if (content !== '') {
      return (
        <li className="book_show_element">
          <span>
            <b>{label}</b>
          </span>
          <br />
          <span>
            <h4>{content}</h4>
          </span>
        </li>
      );
    }
    return;
  }

  renderCategories(categories) {
    return (
      <li className="book_show_element">
        <span>
          <b>Kategorie książki</b>
        </span>
        <br />
        <span>
          <h4>
            {_.map(categories, category => {
              console.log(category);
              return (
                <kbd key={category.category_id}>{category.category_name}</kbd>
              );
            })}
          </h4>
        </span>
      </li>
    );
  }

  render() {
    const { book } = this.props;
    if (!book) {
      return <div>Loading ...</div>;
    }
    return (
      <div>
        <Link className="btn btn-danger" to="/booklist">
          Wróć
        </Link>

        <ul>
          {this.renderElement('Tytuł', book.title)}
          {this.renderElement('Autorzy', book.responsibility)}
          {this.renderElement('Rok wydania', book.year)}
          {this.renderElement('Dostępność', book.availability)}
          {this.renderElement('Typ pozycji', book.type)}
          {this.renderElement('ISBN/ISSN', book.isbn_issn)}
          {this.renderElement('Sygnatura biblioteki MS', book.signature_ms)}
          {this.renderElement(
            'Sygnatura biblioteki głównej',
            book.signature_bg
          )}
          {this.renderCategories(book.categories)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { book: state.books.book };
}

export default connect(mapStateToProps, { fetchBook })(BookShow);
