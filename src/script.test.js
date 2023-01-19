import { carrier, battle } from "./script";

test("test Ship factory function", () => {
  expect(carrier.hits).toStrictEqual(0);
});

test("test class Shipment", () => {
  expect(battle.hits).toBe(0);
});

test("test class Shipment's object", () => {
  expect(battle).toEqual({
    length: 5,
    hits: 0,
    sink: false,
  });
});
