import React from 'react';
import './Card.css';


const card = (props) => {
  let dataId = props.dataURL.replace(/https:\/\/pokeapi.co\/api\/v2\/pokemon\//gi,'');
  dataId = dataId.slice(0,dataId.length-1);
  let imgSRC = process.env.PUBLIC_URL+"/sprites/"+props.dataType+"/"+(dataId)+".png";
  
  return (
    <li className="Card_item" style={props.style} data-id={dataId} onClick={() => props.clicked(props.dataType, props.dataName)}>
      <div className="img" style={{backgroundImage: `url(${imgSRC})`}}></div>
      <span className="Card_itemName">{props.dataName}</span>
    </li>
  );
}

export default card;