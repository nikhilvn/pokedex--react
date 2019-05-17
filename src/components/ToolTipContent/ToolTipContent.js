import React from 'react';
import './ToolTipContent.css';

import PokemonTypes from '../PokemonTypes/PokemonTypes';
import PokemonStats from '../PokemonStats/PokemonStats';
import Loader from '../UI/Loader/Loader';
import Aux from '../../HOC/Aux/Aux';

const toolTipContent = (props) => {
  console.log(props);
  const isLoading = () => {
    return props.isToolTipDataLoaded;
  }
  const loading = (
    <div className="ToolTip_Loader_wrapper">
      <Loader />
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
    console.log(cardDom);
    console.log(toolTipDom);
    if(cardDom.top < 0 || toolTipDom.top < 0) {
      topPosition = cardDom.top*(-1)+"px";
      classes.push("bottom--auto")
    }
    return topPosition;
  }

  let classes = ["ToolTip_Wrapper"+(!isLoading() ? " loading" : "")];

  return (
    <Aux>
      <div style={{top: getTopPosition()}} className={classes.join(" ")}>
        {!isLoading() ? loading : content}
      </div>
      <div className="ToolTip_arrow"></div>
    </Aux>
  );
}

export default toolTipContent;