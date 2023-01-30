import {
  playerShips,
  gameBoard,
  compShips,
  compBoard,
  computer,
} from "./classes";

let playerShipsSunk = 0;
let compShipsSunk = 0;

function startRound() {
  (function attackComp() {
    let playerAttack = compBoard.receiveAttack(event.target.dataset.id);
    //when player shoots same spot
    if (!playerAttack) {
      return alert("invalid placement");
    } else if (playerAttack === "hit") {
      event.target.classList.add("hit");
    } else if (playerAttack === "sunk") {
      event.target.classList.add("hit");
      compShipsSunk++;
      checkSunk(compShipsSunk);
    } else {
      event.target.classList.add("miss");
    }

    attackPlayer();
  })();

  function attackPlayer() {
    let playerCells = document.querySelectorAll(".cell");
    let compMove = computer.makeMove();
    let compAttack = gameBoard.receiveAttack(compMove);
    if (!compAttack) {
      return alert("COMPUTER INVALID");
      //just in case computer placement is invalid
    } else if (compAttack === "hit") {
      playerCells[compMove].classList.add("hit");
    } else if (compAttack === "sunk") {
      playerCells[compMove].classList.add("hit");
      playerShipsSunk++;
      checkSunk(playerShipsSunk);
    } else {
      playerCells[compMove].classList.add("miss");
    }
  }

  function checkSunk(player) {
    if (player === 5) {
      if (player === compShipsSunk) {
        alert("You won!");
      } else {
        alert("You lost!");
      }
      window.location.reload();
    }
  }
}
let currentDiv;

function selectShip(div, rotate) {
  if (!currentDiv) currentDiv = div;
  else {
    currentDiv.style.color = "white";
    currentDiv = div;
  }
  div.style.color = "green";
  //switch used to find variable name
  switch (div.className.split(" ")[1]) {
    case "carrier":
      hoverShip(playerShips[0], rotate);
      return playerShips[0];
    case "battleship":
      hoverShip(playerShips[1], rotate);
      return playerShips[1];
    case "cruiser":
      hoverShip(playerShips[2], rotate);
      return playerShips[2];
    case "sub":
      hoverShip(playerShips[3], rotate);
      return playerShips[3];
    case "destroyer":
      hoverShip(playerShips[4], rotate);
      return playerShips[4];
    default:
      return;
  }
}
let currentShip;
function hoverShip(target, rotate) {
  if (target.constructor.name === "Ship") {
    return (currentShip = target);
  } else {
    gameBoard.placeShip(currentShip, +target.dataset.id, rotate);
  }
}

function checkBoard() {
  let total = 0;
  let tempArr = [];
  gameBoard.board.forEach((cell) => {
    if (cell.ship != null && !tempArr.includes(cell.ship)) {
      tempArr.push(cell.ship);
      total++;
    }
  });
  return total === 5;
}

function createCompBoard() {
  for (let i = 0; i < compShips.length; i++) {
    let randomNum = Math.floor(Math.random() * 100);
    let randomBool = Math.random() < 0.5;
    //when computer places at invalid location, loop reiterates with same index
    if (compBoard.placeShip(compShips[i], randomNum, randomBool) === false)
      i -= 1;
  }
}

export { hoverShip, startRound, selectShip, checkBoard, createCompBoard };
