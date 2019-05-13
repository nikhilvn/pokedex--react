import React from 'react';

import ProgressBar from '../UI/ProgressBar/ProgressBar';

const rearrangedStatsObj = {
  'hp': {
    value: 0,
    highest: 255,
  },
  'attack': {
    value: 0,
    highest: 190,
  },
  'defense': {
    value: 0,
    highest: 230
  },
  'speed': {
    value: 0,
    highest: 180
  },
  'special-attack': {
    value: 0,
    highest: 194
  },
  'special-defense': {
    value: 0,
    highest: 230
  }
}

const rearrangeStatArr = (arr) => {
  arr.forEach(item => {
    rearrangedStatsObj[item.stat.name].value = item.base_stat;
  });
  return rearrangedStatsObj;
}

const getStats = (statsData) => {
  let stats = [];
  const rearrangedStats = rearrangeStatArr(statsData);
  for( let key in rearrangedStats) {
    stats.push((
      <div key={key} className="Pokemon_Stat">
        <span className="Pokemon_StatName">{key}:</span>
        <ProgressBar
          text={rearrangedStats[key].value}
          progress={(rearrangedStats[key].value/rearrangedStats[key].highest)*100}
        />
      </div>
    ));
  }
  return stats;
}

const pokemonStats = (props) => {
  let stats = [];
  if(!props.loading) {
    stats = getStats(props.stats);
  }
  
  return (
    <div className="Pokemon_Stats">
      <span>Stats:</span>
      {stats}
    </div>
  );
}

export default pokemonStats;