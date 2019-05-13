import React from 'react';
import './Single.css';

import Pokemon from '../../containers/Pokemon/Pokemon';

const Single = (props) => {

  const getDetails = (type) => {
    switch (type) {
      case 'pokemon':
        return <Pokemon {...props} />
      default:
        return null;
    }
  }

  
  return (getDetails(props.type));
  
}

export default Single;