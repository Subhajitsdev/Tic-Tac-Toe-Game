var currentPlayer = "X";
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function makeMove(row, col) {
  if (board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementsByClassName("cell")[row * 3 + col].innerText = currentPlayer;
    document.getElementsByClassName("cell")[row * 3 + col].style.pointerEvents = "none";

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    winningPlayer = currentPlayer === "X" ? "O" : "X";

    var gameWon = checkWin();

    if (gameWon) {
      displayWinningMove(row, col);
      setTimeout(function() {
         displayWinningMessage();
         resetGame();
      },1000);
    } else if (checkDraw()) {
        setTimeout(function() {
          displayDrawMessage();
          resetGame();
        },1000);
    }
  }
}
function displayWinningMessage(player) {
    var message = document.getElementById("message");
    message.innerText = "Player " + winningPlayer + " wins!";
    message.style.display = "block";
  }
  function displayDrawMessage() {
    var message = document.getElementById("message");
    message.innerText = "It's a draw!";
    message.style.display = "block";
  }
  
function displayWinningMove(row, col) {
  document.getElementsByClassName("cell")[row * 3 + col].classList.add("winning-move");
}

function checkWin() {
  for (var i = 0; i < 3; i++) {
    if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return true;
    }
    if (board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return true;
    }
  }

  if (board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  }

  if (board[0][2] !== "" && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  currentPlayer = "X";
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.pointerEvents = "auto";
    cells[i].classList.remove("winning-move");
  }
}
