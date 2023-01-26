import { Ship, player, gameBoard } from "./classes";

let carrier = new Ship(5);
let battleship = new Ship(4);
let cruiser = new Ship(3);
let sub = new Ship(3);
let destroyer = new Ship(2);
let shipArr = [carrier, battleship, cruiser, sub, destroyer];

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
      hoverShip(shipArr[0], rotate);
      return shipArr[0];
    case "battleship":
      hoverShip(shipArr[1], rotate);
      return shipArr[1];
    case "cruiser":
      hoverShip(shipArr[2], rotate);
      return shipArr[2];
    case "sub":
      hoverShip(shipArr[3], rotate);
      return shipArr[3];
    case "destroyer":
      hoverShip(shipArr[4], rotate);
      return shipArr[4];
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

export { shipArr, hoverShip, startGame, selectShip };
