import React, { Component } from 'react';
import './App.css';
import Board from '../Board';
import Welcome from '../Welcome/';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome />
        <Board />
      </div>
    );
  }
}

export default App;
