import { after } from "lodash";
import { battleship, gameBoard, Gameboard } from "./script";

describe("Class Ship", () => {
  test("Show base ship values", () => {
    expect(battleship).toEqual({
      length: 5,
      hits: 0,
      sink: false,
    });
  });

  test("show current hits", () => {
    expect(battleship.hits).toEqual(0);
  });

  test("Update hit value", () => {
    for (let i = 1; i <= 5; i++) {
      expect(battleship.hit()).toEqual("Hit!");
      expect(battleship.hits).toEqual(i);
    }
  });

  test("update ship to sunk", () => {
    expect(battleship.isSunk()).toBe(true);
  });

  test("update all ship values", () => {
    expect(battleship).toEqual({
      length: 5,
      hits: 5,
      sink: true,
    });
  });
});
describe("Class Gameboard", () => {
  let testArr;
  beforeEach(() => {
    testArr = new Gameboard();
    gameBoard.createBoard();
  });

  test("gameBoard has length of 100 ", () => {
    expect(gameBoard.board.length).toBe(100);
  });

  test("Board elements has properties hasShip, ship & isShot", () => {
    for (let i = 0; i < 100; i++) {
      expect(gameBoard.board[i]).toStrictEqual({
        hasShip: false,
        ship: null,
        isShot: false,
      });
    }
  });

  test("gameBoard places Ship in array & updates hasShip values", () => {
    for (let i = 0; i < 5; i++) {
      testArr.board[i].hasShip = true;
      testArr.board[i].ship = battleship;
    }
    expect(gameBoard.placeShip(battleship, 0, false)).toStrictEqual(testArr);
  });

  test("Ship placed vertically", () => {
    for (let i = 0; i < 50; i += 10) {
      testArr.board[i].hasShip = true;
      testArr.board[i].ship = battleship;
    }
    gameBoard.createBoard();
    expect(gameBoard.placeShip(battleship, 0, true)).toStrictEqual(testArr);
    testArr = new Gameboard();
    for (let i = 59; i < 59 + battleship.length * 10; i += 10) {
      testArr.board[i].hasShip = true;
      testArr.board[i].ship = battleship;
    }
    gameBoard.createBoard();
    expect(gameBoard.placeShip(battleship, 59, true)).toStrictEqual(testArr);
  });

  test("Ship out of bounds horizontally", () => {
    expect(gameBoard.placeShip(battleship, 8, false)).toBe(false);
  });

  test("Ship out of bounds vertically", () => {
    expect(gameBoard.placeShip(battleship, 60, true)).toStrictEqual(false);
  });

  test("Gameboard updates after attack received", () => {
    testArr.board[0].isShot = true;
    gameBoard.receiveAttack(0);
    expect(gameBoard).toStrictEqual(testArr);
  });

  test("Gameboard receives attack that has ship", () => {
    gameBoard.placeShip(battleship, 0, false);
    expect(gameBoard.receiveAttack(0)).toBe("Hit!");
  });

  test("Gameboard receives attacks on same location", () => {
    gameBoard.receiveAttack(0);
    expect(gameBoard.receiveAttack(0)).toBe("Already shot here");
  });
});
