import { createBrowserHistory } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';

const history = createBrowserHistory();

class RouterStore extends BaseRouterStore {
  constructor() {
    super();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }
}

export default RouterStore;
