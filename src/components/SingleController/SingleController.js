import React from 'react';
import './SingleController.css';

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

  return (getDetails(props.type));
}

export default singleDetails;