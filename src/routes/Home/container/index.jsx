import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import WelcomePage from '../components/WelcomePage';

@inject('routerStore')
@observer
class HomeContainer extends Component {
  render() {
    return <WelcomePage />;
  }
}

export default HomeContainer;
