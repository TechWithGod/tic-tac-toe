const gameBoard = document.getElementById("game-board");
const _ = gameBoard.querySelectorAll("div");

document.querySelector('button').addEventListener('click', ()=> {
    location.reload();
})
let playerOne = true;
let playerTwo = true;
let gameStatus = true;

_.forEach((playBox, index, _) => {
  playBox.addEventListener("click", () => {
    if (playBox.textContent !== "") {
      return;
    }
    if (gameStatus === false) {
      return;
    }
    if (playerOne) {
      playBox.textContent = "X";
      playerOne = false;
      playerTwo = true;
      result();
      return;
    }
    if (playerTwo) {
      playBox.textContent = "O";
      playerTwo = false;
      playerOne = true;
      result();
      return;
    }
  });
});

const winnerDeclare = (player) => {
  if (document.querySelector(".winner")) {
    gameStatus = false;
    return;
  }

  const div = document.createElement("div");
  div.className = "winner";
  let symbol;
  if (player === "DRAW") {
    div.textContent = "DRAW";
    document.body.appendChild(div);
    return;
  }
  if (player === "Player 1") {
    symbol = "X";
  } else {
    symbol = "O";
  }
  div.textContent = `${player.toUpperCase()} WON!`;
  document.body.appendChild(div);
};

const changeStyling = (idx1, idx2, idx3) => {
  _[idx1].style.color = "red";
  _[idx2].style.color = "red";
  _[idx3].style.color = "red";
};

const checker = (idx1, idx2, idx3) => {
  let player;
  let canStyle = false;

  if (
    _[idx1].textContent === "X" &&
    _[idx2].textContent === "X" &&
    _[idx3].textContent === "X"
  ) {
    player = "Player 1";
    canStyle = true;
  } else if (
    _[idx1].textContent === "O" &&
    _[idx2].textContent === "O" &&
    _[idx3].textContent === "O"
  ) {
    player = "Player 2";
    canStyle = true;
  }
  if (canStyle) {
    changeStyling(idx1, idx2, idx3);
    winnerDeclare(player);
    canStyle = false;
  }

  checkDraw();
};

const checkDraw = () => {
  let counter = 0;
  for (let i = 0; i < 9; i++) {
    if (_[i].textContent !== "") {
      counter += 1;
    }
  }
  if (counter === 9) {
    winnerDeclare("DRAW");
    for (let i = 0; i < _.length; i++) {
      _[i].style.color = "red";
    }
  }
};

const result = () => {
  checker(0, 1, 2);
  checker(3, 4, 5);
  checker(6, 7, 8);
  checker(0, 4, 8);
  checker(2, 4, 6);
  checker(0, 3, 6);
  checker(1, 4, 7);
  checker(2, 5, 8);
};
