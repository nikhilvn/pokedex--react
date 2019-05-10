import React from 'react';
import './CardsList.css';

import Card from './Card/Card';
import Loader from '../UI/Loader/Loader';

const cardsList = (props) => {
  let grid = props.listData.map((data, id) => {
    return <Card clicked={props.onSingleClick} dataType={props.dataType} key={id} dataURL={data.url} dataName={data.name} />
  });
  return (
    <ul className="CardsList_Wrapper">
      {grid}
      {props.loading ? <Loader /> : null}
		</ul>
  );
}

export default cardsList;