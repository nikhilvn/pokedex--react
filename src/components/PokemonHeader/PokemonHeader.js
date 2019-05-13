import React from 'react';
import './PokemonHeader.css';

const pokemonHeader = (props) => {
  return (
    <div className="Pokemon_Header">
      <div className="Pokemon_Image">
        <img src={props.imgSrc} />
      </div>
      <div className="Pokemon_Title">
        <h1>{props.name}</h1>
      </div>
    </div>
  );
}

export default pokemonHeader;