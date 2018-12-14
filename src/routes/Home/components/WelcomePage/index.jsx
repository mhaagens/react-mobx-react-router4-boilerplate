import React, { Component } from 'react';

import style from './style.less';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.home}>
        <header>
          <div className={style['hero-unit']}>
            <div className='react-logo' />
            <h1>React MobX React-Router 4 Boilerplate</h1>
          </div>
          <div className={style['hero-subunit']}>
            <h4>A simple starting point for React with routing, data-fetching and state management!</h4>
          </div>
          <div className={style['github-buttons']}>
            <a
              href='https://github.com/taikongfeizhu/react-mobx-react-router4-boilerplate'
              rel='noopener noreferrer'
              target='_blank'
            >
              Download from GitHub
            </a>
          </div>
        </header>
        <main>
          <div className={style['section-header']}>
            <h3>Included libraries</h3>
            <hr />
          </div>
          <div className={style['boilerplate-item']}>
            <div className={`${style['boilerplate-logo']} ${style['react']}`} />
            <div className={style['boilerplate-item-content']}>
              <a href='https://facebook.github.io/react/' rel='noopener noreferrer' target='_blank'>
                <h4>React 16</h4>
              </a>
              <small>UI Library</small>
              <p>
                React makes it painless to create <br />
                interactive UIs.
              </p>
            </div>
          </div>
          <div className={style['boilerplate-item']}>
            <div className={`${style['boilerplate-logo']} ${style['mobx']}`} />
            <div className={style['boilerplate-item-content']}>
              <a href='http://mobxjs.github.io/mobx/' rel='noopener noreferrer' target='_blank'>
                <h4>MobX 5</h4>
              </a>
              <small>Reactive State Management</small>
              <p>MobX is a battle tested library that makes state management simple and scalable.</p>
            </div>
          </div>
          <div className={style['boilerplate-item']}>
            <div className={`${style['boilerplate-logo']} ${style['reactrouter']}`} />
            <div className={style['boilerplate-item-content']}>
              <a href='https://react-router.now.sh/' rel='noopener noreferrer' target='_blank'>
                <h4>React Router 4</h4>
              </a>
              <small>Routing Library</small>
              <p>
                React Router is a declarative way to render, at any location, any UI that you and your team can think
                up.
              </p>
            </div>
          </div>
          <div className={style['boilerplate-item']}>
            <div className={`${style['boilerplate-logo']} ${style['webpack']}`} />
            <div className={style['boilerplate-item-content']}>
              <a href='https://webpack.js.org' rel='noopener noreferrer' target='_blank'>
                <h4>Webpack 4</h4>
              </a>
              <small>Module Bundler</small>
              <p>Webpack takes modules with dependencies and generates static assets representing those modules.</p>
            </div>
          </div>
          <div className={`${style['section-header']} ${style['extras']}`}>
            <h4>Extras</h4>
            <hr />
            <ul>
              <li>✓ React-hot-loader</li>
              <li>✓ Mobx-react-router</li>
              <li>✓ CSS Modules</li>
            </ul>
            <ul>
              <li>✓ Prettier & ESlint</li>
              <li>✓ Babel-preset-env</li>
              <li>✓ Code Splitting</li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
}
