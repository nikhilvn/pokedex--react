import React, { Component } from 'react';
import './Pokemon.css';
import axiosPokeApi from '../../axios-pokeapi';

import ColorBox from '../../components/UI/ColorBox/ColorBox';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import PokemonProfile from '../../components/PokemonProfile/PokemonProfile';

class Pokemon extends Component {

  state = {
    typeColor: {
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
    },
    speciesData: {}
  }

  componentDidMount() {
   this.setSpecies(); 
  }

  setSpecies = () => {
    axiosPokeApi.get(this.props.data.species.url)
      .then(res => {
        this.setState({
          speciesData: res.data
        });
        console.log(this.state.speciesData);
      });
  }

  rearrangeStatArr = (arr) => {
    const newStats = {
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
  
    arr.forEach(item => {
      newStats[item.stat.name].value = item.base_stat;
    });
    return newStats;
  };

  getFlavorText = () => {
    let text = '';
    if(this.state.speciesData.flavor_text_entries) {
      if(this.props.data.game_indices.length) {
        const latestVersion = this.props.data.game_indices[0].version.name;
        this.state.speciesData.flavor_text_entries.forEach(entry => {
          if(entry.version.name === latestVersion) {
            text = entry.flavor_text;
            return;
          }
        });
      } else {
        this.state.speciesData.flavor_text_entries.forEach(entry => {
          if(entry.language.name === "en") {
            text = entry.flavor_text;
            return;
          }
        });
      }
      
    }
    return text;
  }

  getGenus = () => {
    let title = '';
    // if(this.props.data)
    console.log(this.state.speciesData.genera);
    if(this.state.speciesData.genera) {
      this.state.speciesData.genera.forEach(entry => {
        if(entry.language.name === "en") {
          title = entry.genus;
          return;
        }
      });
    }
    return title;
  }

  getTypes = () => {
    if(this.props.data){
      return this.props.data.types.map(type => {
        return <ColorBox key={type.type.name} title={type.type.name} bgColor={this.state.typeColor[type.type.name]} />
      });
    }
  }

  getStats = () => {
    let stats = [];
    const rearrangedStats = this.rearrangeStatArr(this.props.data.stats);
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

  getAbilities= () => {
    if(this.props.data){
      return this.props.data.abilities.map(entry => {
        return entry.ability.name.charAt(0).toUpperCase() + entry.ability.name.slice(1);
      });
    }
  }

  getGenderProb = () => {
    if(this.state.speciesData.gender_rate === -1) {
      return <span>Genderless</span>
    }
    return (
      <span>
        <span>
          <i className="fas fa-mars"></i>
          {((8-this.state.speciesData.gender_rate)/8)*100+"% "}
        </span>
        <span>
          <i className="fas fa-venus"></i>
          {((this.state.speciesData.gender_rate)/8)*100+"%"}
        </span>
      </span>
    );
  }

  getShape = () => {
    let shape = '';
    if(this.state.speciesData.shape) {
      shape = this.state.speciesData.shape.name.charAt(0).toUpperCase() + this.state.speciesData.shape.name.slice(1);
    }
    
    return shape;
  }

  getEggGroups = () => {
    if(this.state.speciesData.egg_groups) {
      return this.state.speciesData.egg_groups.map(entry => {
        return entry.name.charAt(0).toUpperCase() + entry.name.slice(1);
      });
    }
    return [];
  }

  render() {
    const flavorText = this.getFlavorText();

    const types = this.getTypes();

    const stats = this.getStats();

    const profileObj = {
      'Height': {
        display: (this.props.data.height/10)+' m',
        layout: 'half'
      },
      'Weight': {
        display: (this.props.data.weight/10)+' kg',
        layout: 'half'
      },
      'Capture Rate': {
        display: ((this.state.speciesData.capture_rate/255)*100).toFixed(2)+"%",
        layout: 'half'
      },
      'Hatch Steps': {
        display: 255*(this.state.speciesData.hatch_counter+1),
        layout: 'half'
      },
      'Gender Probability': {
        display: this.getGenderProb(),
        layout: 'half'
      },
      'Shape': {
        display: this.getShape(),
        layout: 'half'
      },
      'Egg Groups': {
        display: this.getEggGroups().join(", "),
        layout: 'full'
      },
      'Ablities': {
        display: this.getAbilities().join(", "),
        layout: 'full'
      }
    }

    let profile = [];
    for(let key in profileObj) {
      profile.push((
        <PokemonProfile
          key={key}
          title={key}
          display={profileObj[key].display ? profileObj[key].display : ''}
          layout={profileObj[key].layout}
        />
      ));
    }

    return (
      <div className="Pokemon">
        <div className="Pokemon_Description">
          <div className="Pokemon_DescriptionTitle">{this.getGenus()}</div>
          <div className="Pokemon_DescriptionText">{flavorText}</div>
        </div>
        <h3>General</h3>
        <div className="Pokemon_Types">
          <span>Type:</span>
          {types}
        </div>
        <div className="Pokemon_Stats">
          <span>Stats:</span>
          {stats}
        </div>
        <div className="Pokemon_Profile_wrapper">
          <h3>Profile</h3>
          <div className="Pokemon_Profile">
            {profile}
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;