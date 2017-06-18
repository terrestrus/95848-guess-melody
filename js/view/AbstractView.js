import getElementFromTemplate from '../getElementFromTemplate';
import renderElement from '../render';

class AbstractView {
  get template() {
    throw new Error(`Method can't be implemented in abstract view`);
  }

  render() {
    return getElementFromTemplate(this.template);
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
