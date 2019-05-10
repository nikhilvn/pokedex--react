import React,{ Component } from 'react';
import queryString from 'query-string';
import './Single.css';
import axiosPokeApi from '../../axios-pokeapi';

import SingleDetails from '../../components/SingleDetails/SingleDetails';

class Single extends Component {

  state = {
    dataType: '',
    singleURL: '',
    singleImgSrc: '',
    data: null,
    loading: true
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const url = this.props.url+'/'+values.type+'/'+values.name;
    this.setState({
      singleURL: url,
      dataType: values.type
    }, () => {
      this.loadSingleData();
    });
  }

  loadSingleData = () => {
    axiosPokeApi.get(this.state.singleURL)
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data,
          singleImgSrc: process.env.PUBLIC_URL+"/sprites/"+this.state.dataType+"/"+(res.data.id)+".png",
          loading: false
        });
      });
  }

  render() {
    let content = null;
    if(!this.state.loading) {
      const data = this.state.data;
      content = (
        <div className="Single">
          <div className="Single_Header">
            <div className="Single_Image">
              <img src={this.state.singleImgSrc} />
            </div>
            <div className="Single_Title">
              <h1>{data.name}</h1>
            </div>
          </div>
          <SingleDetails data={data} type={this.state.dataType} />
        </div>
      );
    }
    

    return (content);
  }
}

export default Single;