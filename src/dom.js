import { hoverShip, startGame, selectShip } from "./script";

const board = document.querySelector(".board");
const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");
const startBtn = document.querySelector(".startBtn");
const rotateBtn = document.querySelector(".rotateBtn");
const carrierBtn = document.querySelector(".carrier");
const battleshipBtn = document.querySelector(".battleship");
const cruiserBtn = document.querySelector(".cruiser");
const submarineBtn = document.querySelector(".sub");
const destroyerBtn = document.querySelector(".destroyer");
let playerBoardCells;
let rotate = false;

(function createBoards() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    cell.addEventListener("click", () => hoverShip(cell, rotate));
    playerBoard.append(cell);
  }
  playerBoardCells = document.querySelectorAll("cell");

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    computerBoard.append(cell);
  }
})();

function rotateShip() {
  if (rotate == true) {
    rotate = false;
    rotateBtn.classList.remove("rotate");
  } else {
    rotate = true;
    rotateBtn.classList.add("rotate");
  }
}

rotateBtn.onclick = () => rotateShip();
startBtn.onclick = () => startGame(startBtn);
carrierBtn.onclick = () => selectShip(carrierBtn, rotate);
battleshipBtn.onclick = () => selectShip(battleshipBtn, rotate);
cruiserBtn.onclick = () => selectShip(cruiserBtn, rotate);
submarineBtn.onclick = () => selectShip(submarineBtn, rotate);
destroyerBtn.onclick = () => selectShip(destroyerBtn, rotate);
