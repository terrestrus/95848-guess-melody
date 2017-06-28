class Adapter {

  toServer(data) {
    return JSON.stringify(data);
  }
}

const defaultAdapter = new Adapter();

export default defaultAdapter;
