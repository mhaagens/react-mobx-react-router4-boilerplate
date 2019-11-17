import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import TopNav from '../TopNav';
import Button from './Button';

import style from './style.less';

@inject('routerStore')
@inject('homeStore')
@observer
class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  authenticate = (e) => {
    e.preventDefault();
    const { homeStore } = this.props;
    homeStore.authenticate();
  };

  render() {
    const {
      location,
      homeStore: { authenticated }
    } = this.props;
    return (
      <div className={style.topbar}>
        <TopNav location={location} />
        <Button onClick={this.authenticate} title={authenticated ? 'Log out' : 'Sign in'} />
      </div>
    );
  }
}

TopBar.propTypes = {
  location: propTypes.object,
  routerStore: propTypes.object,
  homeStore: propTypes.object
};

export default TopBar;
