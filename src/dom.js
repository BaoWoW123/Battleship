const board = document.querySelector(".board");
const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");

(function createBoards() {
  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    playerBoard.append(cell);
  }

  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = i;
    cell.dataset.id = i;
    computerBoard.append(cell);
  }
})();
