import React from 'react';
import './PokemonListItem.css';

const pokemonListItem = (props) => {
  let pokemonId = props.pokemonURL.replace(/https:\/\/pokeapi.co\/api\/v2\/pokemon\//gi,'');
  pokemonId = pokemonId.slice(0,pokemonId.length-1);
  return (
    <li className="PokemonList_item" data-id={pokemonId}>
      <img src={process.env.PUBLIC_URL+"/sprites/pokemon/"+(pokemonId)+".png"} />
      <span className="PokemonList_itemName">{props.pokemonName}</span>
    </li>
  );
}

export default pokemonListItem;