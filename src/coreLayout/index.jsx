import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import routes from 'routes';

import '../static/css/normalize.less';
import '../static/css/common.less';

export default class CoreLayout extends Component {
  componentDidMount() {
    document.querySelector('#root').style.display = 'block';
  }

  render() {
    return (
      <Switch>
        {routes.map((route, i) => {
          /* eslint-disable react/no-array-index-key */
          return <Route key={i} exact={route.exact || false} path={route.path} component={route.component} />;
        })}
        <Route path='*' component={NotFound} />
      </Switch>
    );
  }
}
