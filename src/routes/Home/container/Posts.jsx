import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import TopBar from 'components/TopBar';
import FootBar from 'components/FootBar';
import PostsPage from '../components/PostsPage';

@inject('routerStore')
@inject('homeStore')
@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.homeStore = props.homeStore;
  }

  componentDidMount() {
    this.homeStore.getPostList();
  }

  componentWillUnmount() {
    this.homeStore.clearItems();
  }

  render() {
    const {
      match: { url }
    } = this.props;

    const { items } = this.homeStore;
    return (
      <React.Fragment>
        <TopBar />
        <PostsPage items={items} url={url} />
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
