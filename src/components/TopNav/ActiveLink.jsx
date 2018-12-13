import React from 'react';
import { Route, Link } from 'react-router-dom';

const ActiveLink = ({ to, activeOnlyWhenExact, ...rest }) => (
  <Route path={to} exact={activeOnlyWhenExact}>
    {({ match }) => <Link to={to} {...rest} className={match ? 'active' : ''} />}
  </Route>
);

export default ActiveLink;
