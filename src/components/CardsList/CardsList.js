import React from 'react';
import './CardsList.css';

import Card from './Card/Card';
import Loader from '../UI/Loader/Loader';
import Search from '../UI/Search/Search';

const cardsList = (props) => {
  let grid = props.listData.map((data, id) => {
    return <Card clicked={props.onSingleClick} dataType={props.dataType} key={id} dataURL={data.url} dataName={data.name} />
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