import React from 'react';
import './Search.css';

const search = (props) => {
  return (
    <div className="Search_Wrapper">
      <input onChange={props.changed} className="Search_Input" placeholder={props.placeholder} type="text" />
      <button className="Search_Button"><i className="fas fa-search"></i></button>
    </div>
  );
}

export default search;