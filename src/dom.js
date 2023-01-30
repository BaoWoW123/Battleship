import {
  hoverShip,
  startRound,
  selectShip,
  checkBoard,
  createCompBoard,
} from "./script";

const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");
const startBtn = document.querySelector(".startBtn");
const rotateBtn = document.querySelector(".rotateBtn");
const shipBtns = document.querySelectorAll(".ship");
const midBoard = document.querySelector(".UIBoard");
let playerCells;
let rotate = false;

(function createBoards() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.id = i;
    cell.addEventListener("click", cellEvent); //unable to pass argmuments directly to eventlistener
    playerBoard.append(cell);
  }
  playerCells = document.querySelectorAll(".cell");

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "compCell";
    cell.dataset.id = i;
    computerBoard.append(cell);
  }
})();

rotateBtn.onclick = () => {
  if (rotate == true) {
    rotate = false;
    rotateBtn.classList.remove("rotate");
  } else {
    rotate = true;
    rotateBtn.classList.add("rotate");
  }
};

startBtn.onclick = () => {
  if (checkBoard() === false) return alert("Place all ships!");
  removeEvents();
  midBoard.innerHTML = "";
  let resetBtn = document.createElement("button");
  resetBtn.textContent = "Restart";
  midBoard.append(resetBtn);
  resetBtn.onclick = () => window.location.reload();
  createCompBoard();
  document.querySelectorAll(".compCell").forEach((cell) => {
    cell.addEventListener("click", startRound);
  });
};

shipBtns.forEach((btn) => {
  btn.addEventListener("click", btnClick);
});

function btnClick() {
  selectShip(event.target, rotate);
}

function cellEvent() {
  hoverShip(event.target, rotate);
}

function removeEvents() {
  shipBtns.forEach((el) => {
    el.removeEventListener("click", btnClick);
  });
  playerCells.forEach((cell) => {
    cell.removeEventListener("click", cellEvent);
  });
}
