import React from 'react';
import './Button.css';

const button = (props) => {
  let buttonClass = props.extraClasses;
    
  if(props.type === 'primary') {
    buttonClass.push('Button--primary');
  } else if(props.type === 'secondary') {
    buttonClass.push('Button--secondary');
  }
  return (
    <button className={buttonClass.join(' ')} onClick={props.clicked}>{props.children}</button>
  );
}

// button.defaultProps = {
//   extraClasses: [],
// }

export default button;