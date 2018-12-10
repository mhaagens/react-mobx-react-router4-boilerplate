import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import RedBox from 'redbox-react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import store from './store';
import App from './coreLayout';
import { isProduction } from './constants/env';

// ========================================================
// Store Instantiation
// ========================================================

const stores = store.create();
const {
  routerStore: { history }
} = stores;

global._____APP_STATE_____ = stores;

// changing observed observable values only in actions
configure({ enforceActions: 'always' });

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (!isProduction) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // hot reload
    module.hot.accept('./coreLayout', () => {
      try {
        render(<App />, MOUNT_NODE);
      } catch (e) {
        render(<RedBox error={e} />, MOUNT_NODE);
      }
    });
  }
}

// ========================================================
// Go!
// ========================================================
render();
