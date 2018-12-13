import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';
import Protected from '../Protected';

import style from './style.less';

@Protected
@observer
class PostsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, url } = this.props;
    return (
      <div className={style.posts}>
        <h1 onClick={this.getItem}>Posts</h1>
        <p className='subheader'>Posts are fetched from jsonplaceholder.typicode.com</p>
        <hr />
        <ul>
          {items && items.length
            ? items.slice(6, 12).map((post) => {
                return (
                  <li key={post.id}>
                    <Link to={`${url}/${post.id}`}>
                      <h1>{post.title}</h1>
                    </Link>
                    <p>{post.body.substring(0, 120)}</p>
                  </li>
                );
              })
            : 'Loading...'}
        </ul>
      </div>
    );
  }
}

PostsPage.propTypes = {
  match: propTypes.object,
  items: propTypes.object.isRequired,
  url: propTypes.string.isRequired
};

export default PostsPage;
