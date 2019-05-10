import React from 'react';
import './Pokemon.css';

import ColorBox from '../../UI/ColorBox/ColorBox';
import ProgressBar from '../../UI/ProgressBar/ProgressBar';

const pokemon = (props) => {

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

  const newStats = {
    'hp': 0,
    'attack': 0,
    'defense': 0,
    'speed': 0,
    'special-attack': 0,
    'special-defense': 0
  }

  const rearrangeStatArr = (arr) => {
    let newArr = [...arr];
    
    

    return newArr;
  }

  const types = props.data.types.map(type => {
    return <ColorBox key={type.type.name} title={type.type.name} bgColor={typeColor[type.type.name]} />
  });

  const stats = props.data.stats.map(stat => {
    return (
      <div key={stat.stat.name} className="Pokemon_Stat">
        <span className="Pokemon_StatName">{stat.stat.name}:</span>
        <ProgressBar
          text={stat.base_stat}
          progress={stat.base_stat/1.6}
        />
      </div>
    );
  })

  return (
    <div className="Pokemon">
      <div className="Pokemon_Types">
        <span>Type:</span>
        {types}
      </div>
      <div className="Pokemon_Stats">
        <span>Stats:</span>
        {stats}
      </div>
    </div>
  );
}

export default pokemon;