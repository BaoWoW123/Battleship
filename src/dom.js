const board = document.querySelector(".board");
const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");
const startBtn = document.querySelector('.startBtn');
const placeShipBtn = document.querySelector('.placeShipBtn');

(function createBoards() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    playerBoard.append(cell);
  }

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    computerBoard.append(cell);
  }
})();

placeShipBtn.onclick = () => placeShip(); 
startBtn.onclick = () => startGame(); 

function placeShip() {
    console.log('place ship')
}

function startGame() {
    console.log('start game')
}