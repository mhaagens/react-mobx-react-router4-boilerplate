import("./styles/main.scss");
import React from "react";
import {render} from "react-dom";
import {Router} from "react-router-dom";
import {Provider} from "mobx-react";
import {AppContainer} from "react-hot-loader";
import {rehydrate, hotRehydrate} from "rfx-core";

import {isProduction} from "./utils/constants";
import Root from "./components/Root";
import stores from "./stores/stores";
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
const store = rehydrate();

const renderApp = Component => {
    const browserHistory = createBrowserHistory();
    const routeStore = new RouterStore();
    const history = syncHistoryWithStore(browserHistory, routeStore);
    // history.subscribe((location, action) => console.log(location.pathname));
    render(
        <AppContainer>
            <Provider store={isProduction ? store : hotRehydrate()} routing={routeStore}>
                <Router history={history}>
                    <Component />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById("root")
    );
};

renderApp(Root);

if (module.hot) {
    module.hot.accept(() => renderApp(Root));
}
