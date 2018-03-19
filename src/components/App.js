import React, { Component } from 'react';
import { Link } from 'react-router';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" className="text">
            <h1 className="App-title">
              Biblioteka Wydziału Matematyki Stosowanej
            </h1>
          </Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
