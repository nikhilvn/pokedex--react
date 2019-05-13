import React from 'react';


export const getHeight = (data) => {
  if(!data || !data.height) {
    return null;
  }
  return (data.height/10)+' m';
}

export const getWeight = (data) => {
  if(!data || !data.weight) {
    return null;
  }
  return (data.weight/10)+' kg';
}

export const getCaptureRate = (data) => {
  if(!data || !data.capture_rate) {
    return null;
  }
  return ((data.capture_rate/255)*100).toFixed(2)+"%";
}

export const getHatchSteps = (data) => {
  if(!data || !data.hatch_counter) {
    return null;
  }
  return 255*(data.hatch_counter+1);
}

export const getGenderProb = (data) => {
  if(!data || !data.gender_rate) {
    return null;
  }
  if(data.gender_rate === -1) {
    return <span>Genderless</span>
  }
  return (
    <span>
      <span>
        <i className="fas fa-mars"></i>
        {((8-data.gender_rate)/8)*100+"% "}
      </span>
      <span>
        <i className="fas fa-venus"></i>
        {((data.gender_rate)/8)*100+"%"}
      </span>
    </span>
  );
}

export const getShape = (data) => {
  if(!data || !data.shape) {
    return null;
  }
  return data.shape.name.charAt(0).toUpperCase() + data.shape.name.slice(1);
}

export const getEggGroups = (data) => {
  if(!data || !data.egg_groups) {
    return null;
  }
  return data.egg_groups.map(entry => {
    return entry.name.charAt(0).toUpperCase() + entry.name.slice(1);
  }).join(", ");
}

export const getAbilities = (data) => {
  if(!data || !data.abilities) {
    return null;
  }
  return data.abilities.map(entry => {
    return entry.ability.name.charAt(0).toUpperCase() + entry.ability.name.slice(1);
  }).join(", ");
}