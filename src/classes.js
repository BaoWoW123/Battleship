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
  constructor(name) {
    this.name = name;
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
    let shipRow = Math.floor((index + ship.length - 1) / 10);
    let shipRowVert = row + ship.length;
    //checks if ship is out of bounds
    if (index >= 100) return false;
    if (row !== shipRow && rotate === false) {
      return false;
    } else if (shipRowVert > 10 && rotate === true) {
      return false;
    } else {
      let cells = document.querySelectorAll(".cell");
      let compCells = document.querySelectorAll(".compCell");
      let increment = 1;
      if (rotate === true) increment = 10; //increments to 10 for vertical placement
      this.name === "player"
        ? this.clearPrevShip(ship, cells)
        : this.clearPrevShip(ship, compCells);
      for (let i = 0; i < ship.length * increment; i += increment) {
        //checks for overlap on both boards
        if (
          this.name === "player" &&
          this.highlightCell(ship, index + i, cells) == false
        )
          return false;
        if (
          this.name === "comp" &&
          this.highlightCell(ship, index + i, compCells) === false //TEST:Might need to add condition to function to remove compBoard highlight
        )
          return false;
        this.board[index + i].hasShip = true;
        this.board[index + i].ship = ship;
      }
    }
    return this;
  }

  clearPrevShip(ship, cells) {
    for (let i = 0; i < 100; i++) {
      if (this.board[i].ship === ship) {
        this.board[i].ship = null;
        this.board[i].hasShip = false;
        cells[i].classList.remove("hasShip");
      }
    }
  }
  highlightCell(ship, index, cells) {
    cells[index].classList.add("hasShip");
    if (this.board[index].hasShip == true && this.board[index].ship !== ship) {
      this.clearPrevShip(ship, cells);
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
const gameBoard = new Gameboard("player");
const compBoard = new Gameboard("comp");
const player = new Player("me");
const computer = new Player("computer");
//let battleship = new Ship(5); TEST

let compCarrier = new Ship(5);
let compBattleship = new Ship(4);
let compCruiser = new Ship(3);
let compSub = new Ship(3);
let compDestroyer = new Ship(2);

computer.carrier = compCarrier;
computer.battleship = compBattleship;
computer.cruiser = compCruiser;
computer.sub = compSub;
computer.destroyer = compDestroyer;

player.carrier = new Ship(5);
player.battleship = new Ship(4);
player.cruiser = new Ship(3);
player.sub = new Ship(3);
player.destroyer = new Ship(2);

let playerShips = [
  player.carrier,
  player.battleship,
  player.cruiser,
  player.sub,
  player.destroyer,
];

let compShips = [
  compCarrier,
  compBattleship,
  compCruiser,
  compSub,
  compDestroyer,
];

export {
  Ship,
  gameBoard,
  Gameboard,
  player,
  Player,
  computer,
  playerShips,
  compShips,
  compBoard,
};
