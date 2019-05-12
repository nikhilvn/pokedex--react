import React from 'react';
import './Card.css';

import LazyLoad from 'react-lazyload';

const card = (props) => {
  let dataId = props.dataURL.replace(/https:\/\/pokeapi.co\/api\/v2\/pokemon\//gi,'');
  dataId = dataId.slice(0,dataId.length-1);
  let imgSRC = process.env.PUBLIC_URL+"/sprites/"+props.dataType+"/"+(dataId)+".png";
  
  return (
    <li className="Card_item" data-id={dataId} onClick={() => props.clicked(props.dataType, props.dataName, dataId)}>
      {/* <LazyLoad offset={1000} once height={160}> */}
        <img src={imgSRC} alt={props.dataName} />
      {/* </LazyLoad> */}
      <span className="Card_itemName">{props.dataName}</span>
    </li>
  );
}

export default card;