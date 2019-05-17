import React from 'react';
import './Sidebar.css';

import GenerationWidget from './GenerationWidget/GenerationWidget';
import TypeWidget from './TypeWidget/TypeWidget';

const sidebar = (props) => {

  if(props.loading) {
    return null;
  }

  return (
    <aside>
      <div className="Sidebar_wrapper">
        <GenerationWidget filterPokemon={props.filterPokemon} filterData={props.generationsData} />
        <TypeWidget filterPokemon={props.filterPokemon} filterData={props.typesData} />
      </div>
    </aside>
  );
}

export default sidebar;