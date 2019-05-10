import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import { Route, withRouter } from 'react-router-dom';
import './List.css';

import Archive from '../../components/Archive/Archive';
import Single from '../Single/Single';

class List extends Component {
	state = {
		pokemonData: [],
		baseURL: 'https://pokeapi.co/api/v2',
		currentPageURL: 'https://pokeapi.co/api/v2/pokemon',
		singleURL: '',
		dataType: 'pokemon',
		update: true,
		nextPageURL: null,
		prevPageURL: null,
		loading: true,
		pageCount: 0,
		showSingle: false
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		axiosPokeApi.get(this.state.currentPageURL)
		.then(res => {
			this.setState({
				pokemonData: res.data.results,
				pageCount: Math.ceil(res.data.count/20),
				nextPageURL: res.data.next,
				prevPageURL: res.data.previous,
				loading: false
			});
			console.log(res.data);
			
		});
	}

	handlePageClick = (data) => {
		console.log(data);
		
		let selected = data.selected;
		let pageOffset = Math.ceil(selected * 20);
		let currentURL = 'https://pokeapi.co/api/v2/pokemon?offset='+pageOffset+'&limit=20';
		this.setState({
			currentPageURL: currentURL,
			loading: true,
		}, () => {
			this.loadData();
		});
		// console.log(data);	
	}

	handleSingleClick = (type, name) => {
		console.log(this.props);
		this.props.history.push({
			pathname: "/single",
			search: "?type="+type+"&name="+name
		})
	}

	render() {

		return (
			<main>
				<Route
					path="/single"
					render={(props) => (
						<Single {...props}
							url={this.state.baseURL}
						/>
					)}
				/>
				<Route
					exact
					path="/"
					render={(props) => (
						<Archive {...props}
							handleSingleClick={this.handleSingleClick}
							loading={this.state.loading}
							pokemonData={this.state.pokemonData}
							pageCount={this.state.pageCount}
							handlePageClick={this.handlePageClick}
							dataType={this.state.dataType}
						/>
					)}
				/>
			</main>
		);
	}
}

export default withRouter(List);