import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import queryString from 'query-string';
import './Pokemon.css';

import PokemonProfile from '../../components/PokemonProfile/PokemonProfile';
import PokemonHeader from '../../components/PokemonHeader/PokemonHeader';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonTypes from '../../components/PokemonTypes/PokemonTypes';
import PokemonStats from '../../components/PokemonStats/PokemonStats';
import PokemonTypeRelations from '../../components/PokemonTypeRelations/PokemonTypeRelations';
import PokemonEvolutionChain from '../../components/PokemonEvolutionChain/PokemonEvolutionChain'
class Pokemon extends Component {

  state = {
    dataType: '',
    singleURL: '',
    singleImgSrc: '',
    pokemonData: null,
    speciesData: {},
    typeData: [],
    evolutionData: [],
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

  loadPokemonData = () => {
    
  }

  loadData = () => {
    axiosPokeApi.get(this.state.singleURL)
      .then(pokemonResponse => {
        return pokemonResponse.data;
      })
      .then(pokemonResponseData => {
        axiosPokeApi.get(pokemonResponseData.species.url)
        .then(speciesResponse => {
          return speciesResponse.data
        })
        .then(speciesResponseData => {
          axiosPokeApi.get(speciesResponseData.evolution_chain.url)
            .then(evolutionResponse => {
              this.setState({
                pokemonData: pokemonResponseData,
                speciesData: speciesResponseData,
                singleImgSrc: process.env.PUBLIC_URL+"/sprites/"+this.state.dataType+"/"+(speciesResponseData.id)+".png",
                evolutionData: evolutionResponse.data,
              });
              this.isLoading();
            });
        });
        return pokemonResponseData;
      })
      .then(pokemonResponseData => {
        let typeData = [...this.state.typeData];
        pokemonResponseData.types.forEach(entry => {
          axiosPokeApi.get(entry.type.url)
            .then(typeResponse => {
              typeData.push(typeResponse.data);
              this.setState({
                typeData: typeData,
              });
              this.isLoading();
            });
        });
      });
  }

  isLoading = () => {
    if(!this.state.loading) {
      return;
    }
    if(this.state.pokemonData && this.state.speciesData && this.state.typeData.length === this.state.pokemonData.types.length && this.state.evolutionData) {
      console.log(this.state.pokemonData);
      console.log(this.state.speciesData);
      console.log(this.state.evolutionData);
      console.log(this.state.typeData);
      this.setState({
        loading: false
      });
    }
  }

  render() {

    let content ='';

    if(this.state.loading) {
      return content;
    }
    content = (
      <div className="Pokemon">
        <PokemonHeader
          imgSrc={this.state.singleImgSrc}
          name={this.state.pokemonData.name}
        />
        <PokemonDescription
          genusData={this.state.speciesData.genera}
          loading={this.state.loading}
          flavorTextEntries={this.state.speciesData.flavor_text_entries}
          gameIndices={this.state.pokemonData.game_indices}  
        />
        <h3>General</h3>
        <PokemonTypes
          pokemonTypes={this.state.pokemonData.types}
          loading={this.state.loading}
        />
        <PokemonStats
          stats={this.state.pokemonData.stats}
          loading={this.state.loading}
        />
        <h3>Profile</h3>
        <PokemonProfile
          loading={this.state.loading}
          pokemonData={this.state.pokemonData}
          speciesData={this.state.speciesData}
        />
        <h3>Type Relations</h3>
        <PokemonTypeRelations
          loading={this.state.loading}
          typeData={this.state.typeData}
        />
        <PokemonEvolutionChain
          loading={this.state.loading}
          evolutionData={this.state.evolutionData}
        />
      </div>
    );
    
    return content;
  }
}

export default Pokemon;