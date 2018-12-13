import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import TopBar from 'components/TopBar';
import FootBar from 'components/FootBar';
import ArticlePage from '../components/ArticlePage';

@inject('routerStore')
@inject('homeStore')
@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);
    const { homeStore } = this.props;
    this.homeStore = homeStore;
  }

  componentDidMount() {
    const {
      match: {
        params: { id = null }
      }
    } = this.props;
    this.homeStore.getPostItem({ id });
  }

  componentWillUnmount() {
    this.homeStore.clearItems();
  }

  render() {
    const { item } = this.homeStore;
    return (
      <React.Fragment>
        <TopBar />
        <ArticlePage item={item} />
        <FootBar />
      </React.Fragment>
    );
  }
}

HomeContainer.propTypes = {
  homeStore: propTypes.object,
  match: propTypes.object
};

export default HomeContainer;
