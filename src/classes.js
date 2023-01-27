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
  //CHECK FOR COLLISION +++++++++++++++++++++++++++++
  //create loop if this cell is null then ok
  //if cell has ship then dont place ship
  placeShip(ship, index, rotate) {
    let row = Math.floor(index / 10);
    let shipRow = Math.floor((index + ship.length - 1) / 10);
    let shipRowVert = row + ship.length;
    //checks if ship is out of bounds
    if (index >= 100) return;
    if (row !== shipRow && rotate === false) {
      return false;
    } else if (shipRowVert > 10 && rotate === true) {
      return false;
    } else {
      if (rotate === true) {
        this.clearPrevShip(ship);
        for (let i = 0; i < ship.length * 10; i += 10) {
          if (this.highlightCell(ship, index + i) == false) return; //highlights & checks for overlap
          this.board[index + i].hasShip = true;
          this.board[index + i].ship = ship;
        }
      } else {
        this.clearPrevShip(ship);
        for (let i = 0; i < ship.length; i++) {
          if (this.highlightCell(ship, index + i) == false) return;
          this.board[index + i].hasShip = true;
          this.board[index + i].ship = ship;
        }
      }
    }
    return this;
  }

  clearPrevShip(ship) {
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < 100; i++) {
      if (this.board[i].ship === ship) {
        this.board[i].ship = null;
        this.board[i].hasShip = false;
        cells[i].classList.remove("hasShip");
      }
    }
  }
  highlightCell(ship, index) {
    let cells = document.querySelectorAll(".cell");
    cells[index].classList.add("hasShip");
    if (this.board[index].hasShip == true && this.board[index].ship !== ship) {
      this.clearPrevShip(ship)
      return false;
    }
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
    this.cruiser = null;
    this.sub = null;
    this.destroyer = null;
    if (!this.possibleMoves) this.createMoves();
  }

  createMoves() {
    this.possibleMoves = Array(100);
    for (let i = 0; i < this.possibleMoves.length; i++) {
      this.possibleMoves[i] = i;
    }
  }

  makeMove(index) {
    if (!index) {
      let max = this.possibleMoves.length;
      let randomNum = Math.floor(Math.random() * max);
      let value = this.possibleMoves[randomNum];
      this.possibleMoves.splice(randomNum, 1);
      return value;
    }
  }
}
const gameBoard = new Gameboard();
let battleship = new Ship(5);
const player = new Player("me");
const computer = new Player("computer");
player.battleship = battleship;

export { Ship, battleship, gameBoard, Gameboard, player, Player, computer };
