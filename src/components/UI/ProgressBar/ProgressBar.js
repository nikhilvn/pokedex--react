import React from 'react';
import './ProgressBar.css';

const progressBar = (props) => {
  return (
    <div className="ProgressBar_wrapper">
      <div className="ProgressBar_Meter" style={{width: props.progress+'%'}}><span>{props.text}</span></div>
    </div>
  );
}

export default progressBar;