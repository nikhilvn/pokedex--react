import React from 'react';
import './ColorBox.css';


const setContrast = () => {
  
  // var o = Math.round(((parseInt(rgb[0]) * 299) +
  //                     (parseInt(rgb[1]) * 587) +
  //                     (parseInt(rgb[2]) * 114)) / 1000);
  // let fore = (o > 125) ? 'black' : 'white';
  // let back = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
  // $('#bg').css('color', fore); 
  // $('#bg').css('background-color', back);

}

const colorBox = (props) => {

  return (
    <div className="ColorBox">
      <div className="Box" title={props.title} style={{backgroundColor: props.bgColor, color:props.bgColor}}>{props.title}</div>
    </div>
  );
}

export default colorBox;