import React, { Component } from 'react';
import propTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Protected from '../Protected';

import style from './style.less';

@Protected
@observer
class PostsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <div className={style.post}>
        <Link to='/posts'>← Back to Posts</Link>
        {!!item && (
          <article>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </article>
        )}
      </div>
    );
  }
}

PostsPage.propTypes = {
  item: propTypes.object.isRequired
};

export default PostsPage;
