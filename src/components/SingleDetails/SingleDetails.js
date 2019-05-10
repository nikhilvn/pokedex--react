import React from 'react';
import './SingleDetails.css';

import Pokemon from './Pokemon/Pokemon';
import Button from '../UI/Button/Button';

const singleDetails = (props) => {

  const getDetails = (type) => {
    switch (type) {
      case 'pokemon':
        return <Pokemon data={props.data} />
      default:
        return null;
    }
  }

  return (
    <div className="SingleDetails_wrapper">
      {getDetails(props.type)}
    </div>
  );
}

export default singleDetails;