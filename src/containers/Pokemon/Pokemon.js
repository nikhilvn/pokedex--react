import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import queryString from 'query-string';
import './Pokemon.css';

import * as pokemonHelper from '../../Helper/helperPokemon';

import PokemonProfile from '../../components/PokemonProfile/PokemonProfile';
import PokemonHeader from '../../components/PokemonHeader/PokemonHeader';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonTypes from '../../components/PokemonTypes/PokemonTypes';
import PokemonStats from '../../components/PokemonStats/PokemonStats';
class Pokemon extends Component {

  state = {
    dataType: '',
    singleURL: '',
    singleImgSrc: '',
    pokemonData: null,
    speciesData: {},
    loading: true
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const url = this.props.url+'/'+values.type+'/'+values.name;
    this.setState({
      singleURL: url,
      dataType: values.type
    }, () => {
      this.loadData();
    });
  }

  loadData = () => {
    axiosPokeApi.get(this.state.singleURL)
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .then(responseData => {
        axiosPokeApi.get(responseData.species.url)
        .then(res => {
          this.setState({
            pokemonData: responseData,
            speciesData: res.data,
            singleImgSrc: process.env.PUBLIC_URL+"/sprites/"+this.state.dataType+"/"+(res.data.id)+".png",
            loading: false,
          });
          console.log(this.state.pokemonData);
          console.log(this.state.speciesData);
        });
      });
  }

  render() {

    const profileObj = {
      'Height': {
        display: pokemonHelper.getHeight(this.state.pokemonData),
        layout: 'half'
      },
      'Weight': {
        display: pokemonHelper.getWeight(this.state.pokemonData),
        layout: 'half'
      },
      'Capture Rate': {
        display: pokemonHelper.getCaptureRate(this.state.speciesData),
        layout: 'half'
      },
      'Hatch Steps': {
        display: pokemonHelper.getHatchSteps(this.state.speciesData),
        layout: 'half'
      },
      'Gender Probability': {
        display: pokemonHelper.getGenderProb(this.state.speciesData),
        layout: 'half'
      },
      'Shape': {
        display: pokemonHelper.getShape(this.state.speciesData),
        layout: 'half'
      },
      'Egg Groups': {
        display: pokemonHelper.getEggGroups(this.state.speciesData),
        layout: 'full'
      },
      'Ablities': {
        display: pokemonHelper.getAbilities(this.state.pokemonData),
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

    let content = '';
    if(!this.state.loading) {
      content = (
        <div className="Pokemon">
          <PokemonHeader imgSrc={this.state.singleImgSrc} name={this.state.pokemonData.name} />
          <PokemonDescription
            genusData={this.state.speciesData.genera}
            loading={this.state.loading}
            flavorTextEntries={this.state.speciesData.flavor_text_entries}
            gameIndices={this.state.pokemonData.game_indices}  
          />
          <h3>General</h3>
          <PokemonTypes pokemonTypes={this.state.pokemonData.types} loading={this.state.loading} />
          <PokemonStats stats={this.state.pokemonData.stats} loading={this.state.loading} />
          <div className="Pokemon_Profile_wrapper">
            <h3>Profile</h3>
            <div className="Pokemon_Profile">
              {profile}
            </div>
          </div>
        </div>
      );
    }

    return content;
    // console.log(pokemonHelper);
    
    // return null
  }
}

export default Pokemon;