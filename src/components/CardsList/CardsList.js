import React from 'react';
import './CardsList.css';

import Card from '../../containers/List/Card/Card';
import Loader from '../UI/Loader/Loader';
import Search from '../UI/Search/Search';


const getContent = (sortArr, props) => {
  let grid = ''
  sortArr.sort((entry1, entry2) => {
    let entry1DataId = parseInt(getDataId(entry1,props.regularExpression));
    let entry2DataId = parseInt(getDataId(entry2,props.regularExpression));
    return entry1DataId - entry2DataId;
  });
  grid = sortArr.map((entry, index) => {
    return (
      <Card
        regularExpression={props.regularExpression}
        cardUpdate={props.cardUpdate}
        key={index}
        clicked={props.onSingleClick}
        dataURL={entry.pokemon ? entry.pokemon.url : entry.url}
        dataName={entry.pokemon ? entry.pokemon.name : entry.name}
        dataType={props.dataType}
      />
    )
  });
  return grid;
}

const getDataId = (entry, regEx) => {
  let dataId = '';
  if(entry.pokemon) {
    dataId = entry.pokemon.url.replace(regEx,'');
  } else {
    dataId = entry.url.replace(regEx,'');
  }
  dataId = dataId.slice(0,dataId.length-1);
  return dataId;
}

const cardsList = (props) => {
  let grid = '';
  
  let sortArr = [...props.listData];

  if(!props.loading) {
    grid = getContent(sortArr, props);
  }

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