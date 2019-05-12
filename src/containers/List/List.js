import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import { Route, withRouter } from 'react-router-dom';
import './List.css';
import queryString from 'query-string';

import Archive from '../../components/Archive/Archive';
import Single from '../Single/Single';

class List extends Component {
	state = {
		pokemonData: [],
		baseURL: 'https://pokeapi.co/api/v2',
		currentPageURL: 'https://pokeapi.co/api/v2/pokemon?limit=99999',
		singleURL: '',
		dataType: 'pokemon',
		update: true,
		nextPageURL: null,
		prevPageURL: null,
		loading: true,
		pageCount: 0,
		currentPage: 0
	}

	componentDidMount() {
		// this.loadData();
		this.getPageParams();
	}

	loadData = () => {
		axiosPokeApi.get(this.state.currentPageURL)
		.then(res => {
			this.setState({
				pokemonData: res.data.results,
				pageCount: Math.ceil(res.data.count/20),
				nextPageURL: res.data.next,
				prevPageURL: res.data.previous,
				loading: false,
			});
			console.log(res.data);
		});
	}

	getPageParams = () => {
		const values = queryString.parse(this.props.location.search);
		// console.log(values);
		if(Object.keys(values).length) {
			this.handlePageClick({selected: values.page-1});
		} else {
			this.loadData();
		}
	}

	handlePageClick = (data) => {
		console.log(data);
		
		let selected = data.selected;
		let pageOffset = Math.ceil(selected * 20);
		let currentURL = 'https://pokeapi.co/api/v2/pokemon?offset='+pageOffset+'&limit=20';
		this.setState({
			currentPageURL: currentURL,
			loading: true,
			currentPage: selected
		}, () => {
			this.loadData();
		});

		this.props.history.push({
			pathname: "/",
			search: "?page="+(selected+1)
		});
	}

	handleSingleClick = (type, name) => {
		console.log(this.props);
		this.props.history.push({
			pathname: "/single",
			search: "?type="+type+"&name="+name
		});
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
							initialPage={this.state.currentPage}
						/>
					)}
				/>
			</main>
		);
	}
}

export default withRouter(List);