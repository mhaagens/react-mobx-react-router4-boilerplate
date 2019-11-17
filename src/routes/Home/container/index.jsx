import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';
import TopBar from 'components/TopBar';
import FootBar from 'components/FootBar';
import WelcomePage from '../components/WelcomePage';

@observer
class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        <WelcomePage />
        <FootBar />
      </React.Fragment>
    );
  }
}

HomeContainer.propTypes = {
  homeStore: propTypes.object
};

export default HomeContainer;
