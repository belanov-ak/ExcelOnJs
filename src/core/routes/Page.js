export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Method "getRoot" shold be iplemented');
  }

  afterRender() {}

  destroy() {}
}
