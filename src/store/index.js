import RouterStore from './RouterStore';

export default class RootStore {
  static create() {
    return new RootStore();
  }
  
  constructor() {
    this.routerStore = new RouterStore();
  }
}
