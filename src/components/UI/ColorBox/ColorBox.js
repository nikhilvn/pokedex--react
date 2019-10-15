import React from 'react';
import './ColorBox.css';


const setContrast = (rgb) => {
  
  var lightness = Math.round(
    ((parseInt(rgb[0]) * 299) +
    (parseInt(rgb[1]) * 587) +
    (parseInt(rgb[2]) * 114)) / 1000);
  let fontColor = (lightness > 125) ? 'black' : 'white';
  let bgColor = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  return {
    fontColor: fontColor,
    bgColor: bgColor
  }
}

const colorBox = (props) => {

  const colors = setContrast(props.bgColor);

  return (
    <div className="ColorBox">
      <div className="Box" title={props.title} style={{backgroundColor: colors.bgColor, color:colors.fontColor}}>{props.title}</div>
    </div>
  );
}

export default colorBox;