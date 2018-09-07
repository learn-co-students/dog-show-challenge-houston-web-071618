class Adapter {
  constructor() {}

  connectToAPI(url) {
    return fetch(url).then(res => res.json());
  }
}
