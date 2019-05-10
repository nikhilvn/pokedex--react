import React from 'react';
import './Pagination.css';

import ReactPaginate from 'react-paginate';

const pagination = (props) => {
  return (
    <div className="PokemonList_Pagination">
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'Pagination_Break'}
        pageCount={props.pageCount}
        pageRangeDisplayed={3}
        onPageChange={props.onPageClick}
        containerClassName={'Pagination_NumberList'}
        subContainerClassName={'pages pagination'}
        activeClassName={'Pagination_Number--active'}
        marginPagesDisplayed={1}
      />
			</div>
  );
}

export default pagination;