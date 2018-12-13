import { observable, action, computed } from 'mobx';
import { isEmpty } from 'lodash';
import { Posts } from '../service';

class HomeStore {
  @observable authenticated;
  @observable authenticating;
  @observable items;
  @observable item;
  @observable testval;

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};
  }

  getPostList(params = {}) {
    Posts.getPostList(params)
      .then(
        action('success', ({ status, data }) => {
          if (status === 200) {
            this.items = data;
          } else {
            Promise.reject(status);
          }
        })
      )
      .catch(
        action('error', (error) => {
          console.log(error);
        })
      );
  }

  getPostItem(params = {}) {
    Posts.getPostItem(params)
      .then(
        action('success', ({ status, data }) => {
          if (status === 200) {
            this.item = data;
          } else {
            Promise.reject(status);
          }
        })
      )
      .catch(
        action('error', (error) => {
          console.log(error);
        })
      );
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

  @action authenticate() {
    return new Promise((resolve) => {
      setTimeout(
        action('success', () => {
          this.authenticated = !this.authenticated;
          this.authenticating = false;
          resolve(this.authenticated);
        }),
        200
      );
    });
  }

  @computed get loading() {
    return this.items.length > 0;
  }

  @computed get loadingItem() {
    return !isEmpty(this.item);
  }

  @computed get getItem() {
    return this.items.filter((todo) => todo.id === 1);
  }
}

export default HomeStore;
