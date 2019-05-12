import React from 'react';
import './PokemonProfile.css';

const pokemonProfile = (props) => {
  let classes = ["Pokemon_ProfileSingle"];
  if(props.layout === "full") {
    classes.push("width--full");
  }

  const content = (
    <div className={classes.join(" ")}>
      <span className="Pokemon_ProfileSingleTitle">{props.title+": "}</span>
      <span className="Pokemon_ProfileSingleDisplay">{props.display}</span>
    </div>
  )
  return (
    props.display ? content : null
  );
}

export default pokemonProfile;