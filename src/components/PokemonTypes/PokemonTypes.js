import React from 'react';

import ColorBox from '../UI/ColorBox/ColorBox';

const typeColor = {
  'normal': '#A8A77A',
  'fire': '#EE8130',
  'water': '#6390F0',
  'electric': '#F7D02C',
  'grass':'#7AC74C',
  'ice': '#96D9D6',
  'fighting': '#C22E28',
  'poison': '#A33EA1',
  'ground': '#E2BF65',
  'flying': '#A98FF3',
  'psychic': '#F95587',
  'bug': '#A6B91A',
  'rock': '#B6A136',
  'ghost': '#735797',
  'dragon': '#6F35FC',
  'dark': '#705746',
  'steel': '#B7B7CE',
  'fairy': '#D685AD',
  'shadow': '#444444',
  'unknown': '#ffffff',
}

const pokemonTypes = (props) => {
  let types = '';
  if(!props.loading) {
    types = props.pokemonTypes.map(type => {
      return <ColorBox key={type.type.name} title={type.type.name} bgColor={typeColor[type.type.name]} />
    });
  }
  return (
    <div className="Pokemon_Types">
      <span>Type:</span>
      {types}
    </div>
  );
}

export default pokemonTypes;