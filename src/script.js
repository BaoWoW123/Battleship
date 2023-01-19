function Ship(length) {
  let ship = Object.create(actions);
  ship = {
    length: length,
    sink: false,
    hits: 0,
  };
  return ship;
}

let actions = {
  hits() {
    return this.hits;
  },
};

class Shipment {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sink = false;
  }
}
let battle = new Shipment(5);
let carrier = Ship(5);

export { carrier, battle };
