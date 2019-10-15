import React, { Component } from 'react';
import axios from 'axios';
import axiosPokeApi from '../../axios-pokeapi';
import queryString from 'query-string';
import './Pokemon.css';

import PokemonProfile from '../../components/PokemonProfile/PokemonProfile';
import PokemonHeader from '../../components/PokemonHeader/PokemonHeader';
import PokemonDescription from '../../components/PokemonDescription/PokemonDescription';
import PokemonTypes from '../../components/PokemonTypes/PokemonTypes';
import PokemonStats from '../../components/PokemonStats/PokemonStats';
import PokemonTypeRelations from '../../components/PokemonTypeRelations/PokemonTypeRelations';
import PokemonEvolutionChain from '../../components/PokemonEvolutionChain/PokemonEvolutionChain';
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
      this.getData();
    });
  }

  getDataFromAPI = async (url) => {
    let data = null;
    await axiosPokeApi.get(url)
      .then(res => {
        data = res.data
      });
    return data;
    // return axiosPokeApi.get(url);
  }

  getTypeResFromAPI = async (pokemonData) => {
    let typeData = [];
    const typesUrl = pokemonData.types.map(entry => {
      return entry.type.url;
    });
    await axios.all(typesUrl.map(url => axios.get(url)))
      .then(axios.spread((...res) => {
        typeData = res;
      }));
    return typeData;
  }

  getData = async () => {
    const pokemonData = await this.getDataFromAPI(this.state.singleURL);
    const speciesData = await this.getDataFromAPI(pokemonData.species.url);
    const evolutionData = await this.getDataFromAPI(speciesData.evolution_chain.url);
    const typeRes = await this.getTypeResFromAPI(pokemonData);

    const typeData = typeRes.map(res => {
      return res.data;
    });

    if(pokemonData && speciesData && typeData && typeData.length === pokemonData.types.length && evolutionData) {
      this.setState({
        pokemonData: pokemonData,
        speciesData: speciesData,
        evolutionData: evolutionData,
        typeData: typeData,
        singleImgSrc: process.env.PUBLIC_URL+"/sprites/"+this.state.dataType+"/"+(pokemonData.id)+".png",
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
          showTitle={true}
          pokemonTypes={this.state.pokemonData.types}
          loading={this.state.loading}
        />
        <PokemonStats
          showTitle={true}
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