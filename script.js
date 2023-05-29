const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let board = [[null, null, null], [null, null, null], [null, null, null]];

// Add click event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!boardIsFull() && !getWinner() && board[Math.floor(index / 3)][index % 3] === null) {
      board[Math.floor(index / 3)][index % 3] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      console.log(`Player ${currentPlayer} moved to cell ${Math.floor(index / 3)}, ${index % 3}`);

      if (getWinner()) {
        console.log(`Player ${currentPlayer} wins!`);
        resultDisplay.textContent = `Player ${currentPlayer} wins!`;
      } else if (boardIsFull()) {
        console.log("It's a draw!");
        resultDisplay.textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log(`Current player: ${currentPlayer}`);
      }
    }
  });
});

// Check if the board is full
function boardIsFull() {
  for (let row of board) {
    if (row.includes(null)) {
      return false;
    }
  }
  return true;
}

// Check for a winning combination
function getWinner() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] !== null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }

  // Check diagonals
  if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  return null;
}
