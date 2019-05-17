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
		console.log('[componentDidMount]');
		this.loadData();
	}

	loadData = () => {
		axiosPokeApi.get(this.state.generationsURL)
		.then(res => {
			this.setState({
				generationsData: res.data,
			});
			console.log(res.data);
			return res.data.results;
		})
		.then(data => {
			axiosPokeApi.get(data[0].url)
			.then(res => {
				this.setState({
					pokemonData: res.data.pokemon_species,
					pokemonSearchData: res.data.pokemon_species,
				});
			});
		})
		axiosPokeApi.get(this.state.typesURL)
			.then(res => {
				this.setState({
					typesData: res.data,
					loading: false,
					listUpdateLoading: false
				});
			})
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
		searchData = this.state.pokemonData.filter(item => {
			return item.name.indexOf(event.target.value) > -1;
		});
		this.setState({
			pokemonSearchData: searchData,
			listUpdateLoading: false,
			cardUpdate: true
		});
	}

	filterPokemon = (url) => {
		this.setState({
			listUpdateLoading: true,
		});
		axiosPokeApi.get(url)
			.then(res => {
				if(res.data.pokemon !== null && res.data.pokemon !== undefined) {
					console.log(res.data.pokemon);
					this.setState({
						pokemonSearchData: res.data.pokemon,
						baseRE: /https:\/\/pokeapi.co\/api\/v2\/pokemon\//gi,
						listUpdateLoading: false,
					});
				} else if(res.data.pokemon_species !== null && res.data.pokemon_species !== undefined) {
					console.log(res.data.pokemon_species);
					this.setState({
						pokemonSearchData: res.data.pokemon_species,
						baseRE: /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\//gi,
						listUpdateLoading: false,
					});
				}
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