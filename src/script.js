class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sink = false;
  }

  hit() {
    this.hits += 1;
    return this.hits === this.length ? this.isSunk() : "Hit!";
  }

  isSunk() {
    this.sink = true;
    return "Ship sunk!";
  }
}

class Gameboard {
  constructor() {
    if (!this.board) this.createBoard();
  }

  createBoard() {
    this.board = Array(100);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = {
        hasShip: false,
        ship: null,
        isShot: false,
      };
    }
  }

  placeShip(ship, index, rotate) {
    let row = Math.floor(index / 10);
    let shipRow = Math.floor((index + ship.length) / 10);
    let shipRowVert = row + ship.length;
    //checks if ship is out of bounds
    if (index >= 100) return;
    if (row !== shipRow && rotate === false) {
      return false;
    } else if (shipRowVert > 10 && rotate === true) {
      return false;
    } else {
      if (rotate === true) {
        for (let i = 0; i < ship.length * 10; i += 10) {
          this.board[index + i].hasShip = true;
          this.board[index + i].ship = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[index + i].hasShip = true;
          this.board[index + i].ship = ship;
        }
      }
    }
    return this;
  }

  receiveAttack(index) {
    let location = this.board[index];
    if (location.isShot === true) return "Already shot here";
    location.isShot = true;
    if (location.hasShip === true) return location.ship.hit();
  }
}

class Player {
  constructor(player) {
    this.player = player;
    this.carrier = null;
    this.battleship = null;
    this.boat = null;
    if (!this.possibleMoves) this.createMoves();
  }

  createMoves() {
    this.possibleMoves = Array(100);
    for (let i = 0; i < this.possibleMoves.length; i++) {
      this.possibleMoves[i] = i;
    }
  }

  makeMove() {
    let max = this.possibleMoves.length;
    let randomNum = Math.floor(Math.random() * max);
    let value = this.possibleMoves[randomNum];
    this.possibleMoves.splice(randomNum, 1);
    return value;
  }
}
const gameBoard = new Gameboard();
let battleship = new Ship(5);
const player = new Player("me");
const computer = new Player("computer");
player.battleship = battleship;

export { battleship, gameBoard, Gameboard, player, Player, computer };
