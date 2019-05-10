import React from 'react';
import './ColorBox.css';

const colorBox = (props) => {
  return (
    <div className="ColorBox">
      <div className="Box" title={props.title} style={{backgroundColor: props.bgColor}}></div>
    </div>
  );
}

export default colorBox;