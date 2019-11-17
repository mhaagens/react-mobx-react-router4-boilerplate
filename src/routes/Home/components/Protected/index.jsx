import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

export default function Protected(Children) {
  @inject('homeStore')
  @observer
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      const { homeStore } = this.props;
      this.homeStore = homeStore;
    }

    render() {
      const { authenticated, authenticating } = this.homeStore;
      const { location } = this.props;
      return (
        <div className='authComponent'>
          {authenticated ? (
            <Children {...this.props} />
          ) : !authenticating && !authenticated ? (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          ) : null}
        </div>
      );
    }
  }

  return AuthenticatedComponent;
}
