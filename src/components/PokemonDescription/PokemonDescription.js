import React from 'react';
import './PokemonDescription.css';

const getFlavorText = (flavorTextEntries, gameIndices) => {
  let text = '';
  if(flavorTextEntries) {
    if(gameIndices.length) {
      const latestVersion = gameIndices[0].version.name;
      flavorTextEntries.forEach(entry => {
        if(entry.version.name === latestVersion && entry.language.name === "en") {
          text = entry.flavor_text;
          return;
        }
      });
    } else {
      flavorTextEntries.forEach(entry => {
        if(entry.language.name === "en") {
          text = entry.flavor_text;
          return;
        }
      });
    }
  }
  return text;
}

const pokemonDescription = (props) => {
  let genus = '';
  if(!props.loading) {
    props.genusData.forEach(entry => {
      if(entry.language.name === "en") {
        genus = entry.genus;
        return;
      }
    });
  }
  const flavorText = props.loading ? null : getFlavorText(props.flavorTextEntries, props.gameIndices);
  return (
    <div className="Pokemon_Description">
      <div className="Pokemon_DescriptionTitle">{genus}</div>
      <div className="Pokemon_DescriptionText">{flavorText}</div>
    </div>
  );
}

export default pokemonDescription;