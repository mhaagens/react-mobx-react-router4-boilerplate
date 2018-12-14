import { observable } from 'mobx';

export default class PostModel {
  @observable id;
  @observable userId;
  @observable title;
  @observable body;

  constructor({ id, userId, title, body }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static fromJS(data) {
    return new PostModel(data);
  }
}
