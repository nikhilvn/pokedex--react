import React from 'react';
import './Archive.css';

import Sidebar from '../Sidebar/Sidebar';
import Pagination from '../UI/Pagination/Pagination';
import CardsList from '../CardsList/CardsList';

const archive = (props) => {
  return (
    <div className="Archive_wrapper">
      <Sidebar />
      <div className="List_wrapper">
        <CardsList dataType={props.dataType} onSingleClick={props.handleSingleClick} loading={props.loading} listData={props.pokemonData} />
        <Pagination pageCount={props.pageCount} onPageClick={props.handlePageClick} />
      </div>
    </div>
  );
}

export default archive;