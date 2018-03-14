import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Biblioteka Wydziału Matematyki Stosowanej
          </h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
