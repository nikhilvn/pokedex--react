import React from 'react';
import './PokemonTypeRelations.css';

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

const pokemonWeakness = (props) => {
  let weaknesses = [];
  let strengeths = [];
  let weaknessesArr = [];
  let strengethsArr = [];


  props.typeData.forEach(type => {
    type.damage_relations.double_damage_from.forEach(entry => {
      if(weaknesses.indexOf(entry.name) === -1) {
        weaknesses.push(entry.name);
      }
    });
  });
  
  props.typeData.forEach(type => {
    type.damage_relations.double_damage_to.forEach(entry => {
      if(strengeths.indexOf(entry.name) === -1) {
        strengeths.push(entry.name);
      }
    });
  });

  weaknessesArr = weaknesses.map((entry, index) => {
    return <ColorBox key={index} title={entry} bgColor={typeColor[entry]} />
  });
  strengethsArr = strengeths.map((entry, index) => {
    return <ColorBox key={index} title={entry} bgColor={typeColor[entry]} />
  });

  return (
    <div className="Pokemon_TypeRelations_Wrapper">
      <div className="Pokemon_TypeRelations Pokemon_TypeRelations--Weak">
        <h4>Weak Against</h4>
        <div className="Pokemon_TypeRelations_Column">
          {weaknessesArr}
        </div>
      </div>
      <div className="Pokemon_TypeRelations Pokemon_TypeRelations--Strong">
        <h4>Strong Against</h4>
        <div className="Pokemon_TypeRelations_Column">
          {strengethsArr}
        </div>
      </div>
    </div>
  );
}

export default pokemonWeakness;