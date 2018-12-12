import React, { Component } from 'react';

import style from './style.less';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={style.welcome}>WelcomePage</div>;
  }
}
