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
		currentPageURL: 'https://pokeapi.co/api/v2/pokemon?limit=99999',
		singleURL: '',
		dataType: 'pokemon',
		loading: true,
		searchInput: ''
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		axiosPokeApi.get(this.state.currentPageURL)
		.then(res => {
			this.setState({
				pokemonData: res.data.results,
				pokemonSearchData: res.data.results,
				loading: false,
			});
			console.log(res.data);
		});
	}

	handleSingleClick = (type, name) => {
		console.log(this.props);
		this.props.history.push({
			pathname: "/single",
			search: "?type="+type+"&name="+name
		});
	}

	searchChangeHandle = (event) => {
		let searchData = [];
		searchData = this.state.pokemonData.filter(item => {
			return item.name.includes(event.target.value);
		});
		
		this.setState({
			pokemonSearchData: searchData
		});
	}

	render() {

		return (
			<div className="Archive_wrapper">
				<Sidebar />
				<div className="List_wrapper">
					<CardsList
						dataType={this.state.dataType}
						onSingleClick={this.handleSingleClick}
						loading={this.state.loading}
						listData={this.state.pokemonSearchData}
						changed={this.searchChangeHandle}
					/>
				</div>
			</div>
		);
	}
}

export default List;