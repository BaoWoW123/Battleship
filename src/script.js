class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sink = false;
  }

  hit() {
    this.hits += 1;
    return "Hit!";
  }

  isSunk() {
    if (this.hits === this.length) {
      return (this.sink = true);
    }
  }
}

class Gameboard {
  constructor() {
    if (!this.board) {
      this.board = Array(100);
      this.createBoard();
    }
  }

  createBoard() {
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
const gameBoard = new Gameboard();
let battleship = new Ship(5);
export { battleship, gameBoard, Gameboard };
