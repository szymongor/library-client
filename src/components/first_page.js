import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import '../styles/first_page.css';

class FirstPage extends Component {
  render() {
    return (
      <div>
        <h3 className="">System obsługi biblioteki wydziałowej</h3>
        <Link to="search" className="col-md-3 col-xs-12 go-search-btn">
          <span className="glyphicon glyphicon-search" /> Szukaj
        </Link>
        <Link
          to="/app/android"
          className="col-md-offset-1 col-md-3 col-xs-12 go-search-btn"
        >
          Android
        </Link>
        <Link
          to="/app/ios"
          className="col-md-offset-1 col-md-3 col-xs-12 go-search-btn"
        >
          IOS
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(FirstPage);
