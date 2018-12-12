import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import WelcomePage from '../components/WelcomePage';

@inject('routerStore')
@inject('homeStore')
@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { homeStore } = this.props;
    homeStore.getPostList();
  }

  render() {
    const {
      homeStore: { items, loading }
    } = this.props;

    console.log(items);
    console.log(loading);

    return <WelcomePage />;
  }
}

HomeContainer.propTypes = {
  homeStore: propTypes.object
};

export default HomeContainer;
