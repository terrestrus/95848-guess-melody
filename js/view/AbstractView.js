class AbstractView {
  get template() {
    throw new Error(`Method can't be implemented in abstract view`);
  }

  render() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.template, `text/html`);
    return doc.body.firstElementChild;
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;

  }

}

export default AbstractView;
