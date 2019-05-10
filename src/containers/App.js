import React, { Component } from 'react';
import './App.css';

import List from './List/List';
import Header from '../components/Header/Header';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <List />
      </div>
    );
  }
}

export default App;
