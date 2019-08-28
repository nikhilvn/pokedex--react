import React from 'react';
import './ToolTipContent.css';

import PokemonTypes from '../PokemonTypes/PokemonTypes';
import PokemonStats from '../PokemonStats/PokemonStats';
import Loader from '../UI/Loader/Loader';
import Aux from '../../HOC/Aux/Aux';

const toolTipContent = (props) => {
  const isLoading = () => {
    return props.isToolTipDataLoaded;
    // return false;
  }
  const loading = (
    <div className="ToolTip_Loader_wrapper">
      
    </div>
  )
  const content = (
    <Aux>
      <PokemonTypes showTitle={false} pokemonTypes={props.typesData} />
      <PokemonStats showTitle={false} stats={props.statsData} />
    </Aux>
  );
  const getTopPosition = () => {
    let topPosition = "auto";

    let cardEL = document.getElementById("pokemon"+props.dataId);
    let toolTipEL = document.querySelectorAll("#pokemon"+props.dataId+" .ToolTip_Wrapper")[0];
    
    if(!(cardEL && toolTipEL)) {
      return topPosition;
    }
    let cardDom = null;
    let toolTipDom = null;
    cardDom = cardEL.getBoundingClientRect();
    toolTipDom = toolTipEL.getBoundingClientRect();
    if(cardDom.top < 0 || toolTipDom.top < 0) {
      topPosition = cardDom.top*(-1)+"px";
      classes.push("bottom--auto")
    }
    return topPosition;
  }

  let classes = ["ToolTip_Wrapper"+(!isLoading() ? " loading" : "")];

  // let classes = ["ToolTip_Wrapper loading"];

  return (
    <Aux>
      <div style={{top: getTopPosition()}} className={classes.join(" ")}>
        {!isLoading() ? loading : content}
        {/* {loading} */}
      </div>
      <div className="ToolTip_arrow"></div>
    </Aux>
  );
}

export default toolTipContent;