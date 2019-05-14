import React from 'react';
import * as pokemonHelper from '../../Helper/helperPokemon';
import './PokemonProfile.css';

const pokemonProfile = (props) => {
  const profileObj = {
    'Height': {
      display: pokemonHelper.getHeight(props.pokemonData),
      layout: 'half'
    },
    'Weight': {
      display: pokemonHelper.getWeight(props.pokemonData),
      layout: 'half'
    },
    'Capture Rate': {
      display: pokemonHelper.getCaptureRate(props.speciesData),
      layout: 'half'
    },
    'Hatch Steps': {
      display: pokemonHelper.getHatchSteps(props.speciesData),
      layout: 'half'
    },
    'Gender Probability': {
      display: pokemonHelper.getGenderProb(props.speciesData),
      layout: 'half'
    },
    'Shape': {
      display: pokemonHelper.getShape(props.speciesData),
      layout: 'half'
    },
    'Egg Groups': {
      display: pokemonHelper.getEggGroups(props.speciesData),
      layout: 'full'
    },
    'Ablities': {
      display: pokemonHelper.getAbilities(props.pokemonData),
      layout: 'full'
    }
  }

  let profile = [];

  for(let key in profileObj) {
    let classes = ["Pokemon_ProfileSingle"];
    if(profileObj[key].layout === "full") {
      classes.push("width--full");
    }
    profile.push((
      <div key={key} className={classes.join(" ")}>
        <span className="Pokemon_ProfileSingleTitle">{key+": "}</span>
        <span className="Pokemon_ProfileSingleDisplay">{profileObj[key].display ? profileObj[key].display : ''}</span>
      </div>
    ));
  }

  const content = (
    <div className="Pokemon_Profile_wrapper">
      <div className="Pokemon_Profile">
        {profile}
      </div>
    </div>
  )
  return (
    props.loading ? null : content
  );
}

export default pokemonProfile;