import React from 'react';
import './GenerationWidget.css';

const getGenId = (url) => {
  let genId = url.replace(/https:\/\/pokeapi.co\/api\/v2\/generation\//gi,'');
  genId = genId.slice(0,genId.length-1);
  return genId;
}

const clickEvent = (e, url, fn) => {
  document.querySelectorAll(".Widget_FilterItem").forEach(elem => {
    elem.classList.remove("active");
  });
  e.target.classList.add("active");
  fn(url);
}

const generationWidget = (props) => {
  const content = (
    <div className="Widget">
      <h4>Generations</h4>
      <ul className="Widget_FilterList">
        {props.filterData.results.map((entry, index) => {
          let genId = getGenId(entry.url);
          return <li className={"Widget_FilterItem"+(index===0 ? " active" : "")} key={genId} onClick={(event) => clickEvent(event, entry.url, props.filterPokemon)}>{`Gen ${genId}`}</li>
        })}
      </ul>
    </div>
  );
  return content;
}

export default generationWidget;