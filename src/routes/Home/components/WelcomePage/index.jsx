import React, { Component } from 'react';
import fetchAPI from 'api/fetchAPI';
import style from './style.less';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
    this.handleFetchData();
  }

  async handleFetchData() {
    const { status, data } = await fetchAPI.get('/api/posts/');
    if (status == 200) {
      this.setState({
        bookList: data
      });
    }
  }

  render() {
    const { bookList } = this.state;
    console.log(bookList);
    return <div className={style.welcome}>WelcomePage</div>;
  }
}
