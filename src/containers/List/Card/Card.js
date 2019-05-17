import React from 'react';
import axios, { cache } from '../../../axios-pokeapi';
import './Card.css';

import ToolTipContent from '../../../components/ToolTipContent/ToolTipContent';
import Aux from '../../../HOC/Aux/Aux';

let timer = null;

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.toolTipRef = React.createRef();
  }

  state = {
    dataId: '',
    imgSRC: '',
    isHovered: false,
    isToolTipDataLoaded: false,
    toolTipTypeData: null,
    toolTipStatsData: null,
    toolTipDOM: 0,
  }

  componentDidMount() {
    console.log('[componentDidMount]');
    let dataId = this.getDataId();
    let imgSRC = process.env.PUBLIC_URL+"/sprites/"+this.props.dataType+"/"+(dataId)+".png";
    this.setState({
      dataId: dataId,
      imgSRC: imgSRC,
    });
  }

  // componentDidUpdate() {
  //   console.log('[componentDidUpdate]');
  //   let dataId = this.getDataId();
  //   console.log("https://pokeapi.co/api/v2/pokemon/"+this.state.dataId);
    
  // }

  loadData = (dataId) => {
    console.log(dataId);
    if(cache.store.store["https://pokeapi.co/api/v2/pokemon/"+dataId] && !this.state.isToolTipDataLoaded && this.state.isHovered) {
      let data = JSON.parse(cache.store.store["https://pokeapi.co/api/v2/pokemon/"+dataId])
      data = data.data.data;
      console.log(data);
      
      this.setState({
        toolTipTypeData: data.types,
        toolTipStatsData: data.stats,
        isToolTipDataLoaded: true
      });
    } else if(!this.state.isToolTipDataLoaded && this.state.isHovered) {
      axios.get("https://pokeapi.co/api/v2/pokemon/"+dataId)
      .then(res => {
        console.log(res.data);
        this.setState({
          toolTipTypeData: res.data.types,
          toolTipStatsData: res.data.stats,
          isToolTipDataLoaded: true
        });
      });
    }
  }

  getDataId = (regEx) => {
    let dataId = this.props.dataURL.replace(regEx,'');
    dataId = dataId.slice(0,dataId.length-1);
    return dataId;
  }

  mouseEntered = (dataId) => {
    timer = setTimeout(() => {
      this.setState({
        isHovered: true,
        isToolTipDataLoaded: false,
        dataId: dataId
      }, () => this.loadData(dataId));
    }, 200);
  }

  mouseLeft = () => {
    clearTimeout(timer);
    this.setState({
      isHovered: false
    })
  }

  showToolTip = () => {
    return this.state.isHovered && this.state.toolTipStatsData && this.state.toolTipTypeData
  }

  render() {

    let dataId = this.getDataId(this.props.regularExpression);
    let imgSRC = process.env.PUBLIC_URL+"/sprites/"+this.props.dataType+"/"+(dataId)+".png";
    
    return (
      <Aux>
        <li className="Card_item" style={this.props.style} onMouseLeave={this.mouseLeft} id={"pokemon"+dataId} onMouseEnter={() => this.mouseEntered(dataId)} onClick={() => this.props.clicked(this.props.dataType, this.props.dataName)}>
          <img src={imgSRC} alt={this.props.dataName} />
          <span className="Card_itemName">{this.props.dataName}</span>
          {this.state.isHovered ? <ToolTipContent dataId={this.state.dataId} isToolTipDataLoaded={this.state.isToolTipDataLoaded} typesData={this.state.toolTipTypeData} statsData={this.state.toolTipStatsData} /> : null}
        </li>
        
      </Aux>
    );
  }
}

export default Card;