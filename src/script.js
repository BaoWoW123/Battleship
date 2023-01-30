import { playerShips, gameBoard, compShips, compBoard } from "./classes";

function startGame(div) {}
let currentDiv;

function selectShip(div, rotate) {
  if (!currentDiv) currentDiv = div;
  else {
    currentDiv.style.color = "white";
    currentDiv = div;
  }
  div.style.color = "green";

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
    gameBoard.board.forEach(cell => {
        if (cell.ship != null && !tempArr.includes(cell.ship)) { 
            tempArr.push(cell.ship)
            total++
        }
    })
    return (total === 5);
}
function targetCell() {
    console.log(event.target.dataset.id)
}

function createCompBoard() {
    for(let i = 0; i < compShips.length; i++) {     
        let randomNum = Math.floor(Math.random() * 100);
        let randomBool = Math.random() < 0.5;

        if (compBoard.placeShip(compShips[i], randomNum, randomBool) === false) {
          i-=1;
        }
    }
}

export { hoverShip, startGame, selectShip, checkBoard, targetCell, createCompBoard };
