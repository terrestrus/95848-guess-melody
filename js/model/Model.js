import defaultAdapter from './Adapter';

class Model {
  get urlRead() {
    throw new Error(`Method should be defined in instance`);
  }

  get urlWrite() {
    throw new Error(`Method should be defined in instance`);
  }

  load() {
    return fetch(this.urlRead)
      .then((resp) => resp.json())
      .then();

  }
}

export default Model;
