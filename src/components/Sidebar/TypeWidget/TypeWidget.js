import React from 'react';

const getTypeId = (url) => {
  let typeId = url.replace(/https:\/\/pokeapi.co\/api\/v2\/type\//gi,'');
  typeId = typeId.slice(0,typeId.length-1);
  return typeId;
}

const clickEvent = (e, url, fn) => {
  document.querySelectorAll(".Widget_FilterItem").forEach(elem => {
    elem.classList.remove("active");
  });
  e.target.classList.add("active");
  fn(url);
}

const typeWidget = (props) => {
  const content = (
    <div className="Widget">
      <h4>Types</h4>
      <ul className="Widget_FilterList">
        {props.filterData.results.map((entry) => {
          let typeId = getTypeId(entry.url);
          return <li className="Widget_FilterItem" key={typeId} onClick={(event) => clickEvent(event, entry.url, props.filterPokemon)}>{entry.name}</li>
        })}
      </ul>
    </div>
  );
  return content;
}

export default typeWidget;