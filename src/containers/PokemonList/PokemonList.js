import React, { Component } from 'react';
import axiosPokeApi from '../../axios-pokeapi';
import './PokemonList.css';
import ReactPaginate from 'react-paginate';

import PokemonListItem from '../../components/PokemonListItem/PokemonListItem';
import Loader from '../../components/UI/Loader/Loader';

class PokemonList extends Component {
	state = {
		pokemonData: [],
		currentPageURL: 'https://pokeapi.co/api/v2/pokemon?limit=1000',
		update: true,
		nextPageURL: null,
		prevPageURL: null,
		loading: true,
		pageCount: 0
	}

	componentDidMount() {
		this.loadPokemons();
	}

	loadPokemons = () => {
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
		let selected = data.selected;
		let pageOffset = Math.ceil(selected * 20);
		let currentURL = 'https://pokeapi.co/api/v2/pokemon?offset='+pageOffset+'&limit=20';
		this.setState({
			currentPageURL: currentURL,
			loading: true,
		}, () => {
			this.loadPokemons();
		});
		// console.log(data);
		
	}

	render() {
		let pokemonList = this.state.pokemonData.map((pokemon, id) => {
			return <PokemonListItem key={id} pokemonURL={pokemon.url} pokemonName={pokemon.name} />
		});
		return (
			<div className="PokemonList_wrapper">
				<ul className="PokemonList_list">
					{pokemonList}
					{this.state.loading ? <Loader /> : null}
				</ul>
				<div className="PokemonList_Pagination">
					<ReactPaginate
					previousLabel={'previous'}
					nextLabel={'next'}
					breakLabel={'...'}
					breakClassName={'Pagination_Break'}
					pageCount={this.state.pageCount}
					pageRangeDisplayed={3}
					onPageChange={this.handlePageClick}
					containerClassName={'Pagination_NumberList'}
					subContainerClassName={'pages pagination'}
					activeClassName={'Pagination_Number--active'}
					marginPagesDisplayed={1}
					/>
				</div>
			</div>
		);
	}
}

export default PokemonList;