class Adapter {

  encodeData(data) {
    return JSON.stringify(data);
  }
}

const defaultAdapter = new Adapter();

export default defaultAdapter;
