import defaultAdapter from '../model/Adapter';

class Model {
  get urlRead() {
    throw new Error(`Method should be defined in instance`);
  }

  get urlWrite() {
    throw new Error(`Method should be defined in instance`);
  }

  load() {
    return fetch(this.urlRead)
      .then((resp) => resp.json());
  }

  send(data, adapter = defaultAdapter) {
    const requestSettings = {
      body: adapter.encodeData(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(this.urlWrite, requestSettings);

  }

  getStat() {
    return fetch(this.urlWrite)
      .then((resp) => resp.json())
      .catch(() => {
        throw new Error(`Can't load statistics from server`);
      });
  }
}

export default Model;
