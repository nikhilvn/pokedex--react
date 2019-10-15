import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Single from '../../components/Single/Single';
import List from '../List/List';

class Content extends Component {

  state = {
    baseURL: 'https://pokeapi.co/api/v2',
    dataType: 'pokemon'
  }

  render() {
    return(
      <main>
        <Route
          path="/single"
          render={(props) => (
            <Single {...props}
              url={this.state.baseURL}
              type={this.state.dataType}
            />
          )}
        />
        <Route
          exact
          path="/"
          component={List}
        />
      </main>
    );
  }
}

export default Content;
