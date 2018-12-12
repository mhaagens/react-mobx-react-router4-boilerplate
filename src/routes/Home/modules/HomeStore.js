import fetchAPI from 'api/fetchAPI';
import { observable, action, computed } from 'mobx';

export default class AppState {
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

  async fetchData(pathname) {
    const { data } = await fetchAPI.get(`https://jsonplaceholder.typicode.com${pathname}`);
    this.setData(data);
  }

  async fetchDataById(pathname, id) {
    const { data } = await fetchAPI.get(`https://jsonplaceholder.typicode.com${pathname}/${id}`);
    this.setData(data);
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }

  @action authenticate() {
    return new Promise((resolve) => {
      this.authenticating = true;
      setTimeout(() => {
        this.authenticated = !this.authenticated;
        this.authenticating = false;
        resolve(this.authenticated);
      }, 0);
    });
  }

  @computed get getItem() {
    return this.items.filter((todo) => todo.id === 1);
  }
}
