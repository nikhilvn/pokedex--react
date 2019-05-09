import React, { Component } from 'react';
import './App.css';
import axiosPokeApi from '../axios-pokeapi';

import PokemonList from './PokemonList/PokemonList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <PokemonList />
      </div>
    );
  }
}

export default App;
