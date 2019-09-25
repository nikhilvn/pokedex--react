import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import './List.css';

import Sidebar from '../../components/Sidebar/Sidebar';
import CardsList from '../../components/CardsList/CardsList';

class List extends Component {
	state = {
		pokemonData: [],
		pokemonSearchData: [],
		baseURL: 'https://pokeapi.co/api/v2',
		generationsURL: 'https://pokeapi.co/api/v2/generation',
		typesURL: 'https://pokeapi.co/api/v2/type',
		baseRE: /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\//gi,
		singleURL: '',
		dataType: 'pokemon',
		loading: true,
		listUpdateLoading: true,
		searchInput: '',
		cardUpdate: false,
		generationCount: 0,
		generationURLArr: [],
		typeURLArr: []
	}

	componentDidMount() {
		this.loadData();
	}

	getDataFromAPI = async (url) => {
		let data = null;

		await axiosPokeApi.get(url)
			.then(res => {
				data = res.data;
			});
		
		return data;
	}

	loadData = async () => {

		const generationsData = await this.getDataFromAPI(this.state.generationsURL);
		const pokemonData = await this.getDataFromAPI(generationsData.results[0].url);
		const typesData = await this.getDataFromAPI(this.state.typesURL);

		if( generationsData && pokemonData && typesData ) {
			this.setState({
				generationsData: generationsData,
				pokemonData: pokemonData.pokemon_species,
				pokemonSearchData: pokemonData.pokemon_species,
				typesData: typesData,
				loading: false,
				listUpdateLoading: false
			});
		}
		
	}

	handleSingleClick = (type, name) => {
		this.props.history.push({
			pathname: "/single",
			search: "?type="+type+"&name="+name
		});
	}

	searchChangeHandle = (event) => {
		if(!event.target.value) {
			this.setState({
				pokemonSearchData: this.state.pokemonData
			});
			return;
		}
		let searchData = [];
		searchData = this.state.pokemonSearchData.filter(item => {
			console.log(item);
			return item.pokemon ? item.pokemon.name.indexOf(event.target.value) > -1 : item.name.indexOf(event.target.value) > -1;
		});
		this.setState({
			pokemonSearchData: searchData,
			listUpdateLoading: false,
			cardUpdate: true
		});
	}

	filterPokemon = async (url) => {
		this.setState({
			listUpdateLoading: true,
		});

		let baseRE = '';
		let pokemonData = null;
		const filteredPokemonData = await this.getDataFromAPI(url);

		if(filteredPokemonData.pokemon !== null && filteredPokemonData.pokemon !== undefined) {
			baseRE = /https:\/\/pokeapi.co\/api\/v2\/pokemon\//gi;
			pokemonData = filteredPokemonData.pokemon;
		} else if(filteredPokemonData.pokemon_species !== null && filteredPokemonData.pokemon_species !== undefined) {
			baseRE = /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\//gi;
			pokemonData = filteredPokemonData.pokemon_species;
		}

		this.setState({
			pokemonSearchData: pokemonData,
			pokemonData: pokemonData,
			baseRE: baseRE,
			listUpdateLoading: false,
		});

	}

	render() {
		return (
			<div className="Archive_wrapper">
				<Sidebar
					regularExpression={this.state.baseRE}
					loading={this.state.loading}
					generationsData={this.state.generationsData}
					typesData={this.state.typesData}
					filterPokemon={this.filterPokemon}
				/>
				<div className="List_wrapper">
					<CardsList
						regularExpression={this.state.baseRE}
						dataType={this.state.dataType}
						onSingleClick={this.handleSingleClick}
						loading={this.state.listUpdateLoading}
						listData={this.state.pokemonSearchData}
						changed={this.searchChangeHandle}
						cardUpdate={this.state.cardUpdate}
					/>
				</div>
			</div>
		);
	}
}

export default List;