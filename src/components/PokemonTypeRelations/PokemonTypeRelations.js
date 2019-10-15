import React from 'react';
import './PokemonTypeRelations.css';

import ColorBox from '../UI/ColorBox/ColorBox';

// const typeColor = {
//   'normal': '#A8A77A',
//   'fire': '#EE8130',
//   'water': '#6390F0',
//   'electric': '#F7D02C',
//   'grass':'#7AC74C',
//   'ice': '#96D9D6',
//   'fighting': '#C22E28',
//   'poison': '#A33EA1',
//   'ground': '#E2BF65',
//   'flying': '#A98FF3',
//   'psychic': '#F95587',
//   'bug': '#A6B91A',
//   'rock': '#B6A136',
//   'ghost': '#735797',
//   'dragon': '#6F35FC',
//   'dark': '#705746',
//   'steel': '#B7B7CE',
//   'fairy': '#D685AD',
//   'shadow': '#444444',
//   'unknown': '#ffffff',
// }

const typeColor = {
  'normal': [168,167,122],
  'fire': [238,129,48],
  'water': [99,144,240],
  'electric': [247,208,44],
  'grass': [122,199,76],
  'ice': [150,217,214],
  'fighting': [194,46,40],
  'poison': [163,62,161],
  'ground': [226,191,101],
  'flying': [169,143,243],
  'psychic': [249,85,135],
  'bug': [166,185,26],
  'rock': [182,161,54],
  'ghost': [115,87,151],
  'dragon': [111,53,252],
  'dark': [112,87,70],
  'steel': [183,183,206],
  'fairy': [214,133,173],
  'shadow': [68,68,68],
  'unknown': [255,255,255],
}

const pokemonWeakness = (props) => {
  let weaknesses = [];
  let strengeths = [];
  let weaknessesArr = [];
  let strengethsArr = [];

  console.log(props.typeData);

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

  console.log(weaknessesArr);
  console.log(strengethsArr);

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