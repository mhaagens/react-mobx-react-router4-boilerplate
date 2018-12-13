import React, { Component } from 'react';
import propTypes from 'prop-types';

class FootBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <a href='https://twitter.com/mhaagens' target='_blank' rel='noopener noreferrer'>
          @Abcat
        </a>{' '}
        | github:{' '}
        <a href='https://github.com/mhaagens' target='_blank' rel='noopener noreferrer'>
          taikongfeizhu
        </a>
      </footer>
    );
  }
}

FootBar.propTypes = {
  location: propTypes.object,
  routerStore: propTypes.object,
  homeStore: propTypes.object
};

export default FootBar;
