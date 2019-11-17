import React, { Component } from 'react';
import propTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ActiveLink from './ActiveLink';

import style from './style.less';

@inject('homeStore')
@observer
class Index extends Component {
  constructor(props) {
    super(props);
  }

  authenticate(e) {
    e.preventDefault();
    const { homeStore } = this.props;
    homeStore.authenticate();
  }

  render() {
    const { homeStore } = this.props;
    const { authenticated } = homeStore;
    return (
      <nav className={style.topNav}>
        <ActiveLink activeOnlyWhenExact to='/'>
          Home
        </ActiveLink>
        {authenticated && <ActiveLink to='/posts'>Posts</ActiveLink>}
      </nav>
    );
  }
}

Index.propTypes = {
  location: propTypes.object,
  routerStore: propTypes.object,
  homeStore: propTypes.object
};

export default Index;
