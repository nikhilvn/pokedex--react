import React from 'react';
import './SingleDetails.css';

import Pokemon from '../../containers/Pokemon/Pokemon';

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