import React from 'react';
import './CardsList.css';

import Card from './Card/Card';
import Loader from '../UI/Loader/Loader';
import Search from '../UI/Search/Search';



const cardsList = (props) => {
  let grid = '';
  grid = props.listData.map((entry, index) => {
    return (
      <Card
        key={index}
        clicked={props.onSingleClick}
        dataURL={entry.url}
        dataName={entry.name}
        dataType={props.dataType}
      />
    )
  });
  return (
    <div className="CardsList_Wrapper">
      <Search changed={props.changed} placeholder="Search" />
      <ul className="CardsList_List">
        {props.loading ? <Loader /> : grid}
      </ul>
    </div>
  );
}

export default cardsList;