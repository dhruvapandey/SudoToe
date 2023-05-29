const cells = document.querySelectorAll('.cell');
    const resultDisplay = document.getElementById('result');
    let currentPlayer = 'X';
    let board = [[null, null, null], [null, null, null], [null, null, null]];
    let numbersEntered = [[null, null, null], [null, null, null], [null, null, null]];

    // Add click event listeners to cells
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        if (!boardIsFull() && !getWinner() && board[Math.floor(index / 3)][index % 3] === null) {
          const numberEntered = prompt("Enter a number between 1 and 3:");
          if (
            isValidNumber(numberEntered) &&
            !isNumberRepeated(numberEntered, Math.floor(index / 3), index % 3)
          ) {
            board[Math.floor(index / 3)][index % 3] = { mark: currentPlayer, number: numberEntered };
            cell.innerHTML = currentPlayer + '<br>' + numberEntered;
            cell.classList.add(currentPlayer);
            console.log(`Player ${currentPlayer} moved to cell ${Math.floor(index / 3)}, ${index % 3}`);

            numbersEntered[Math.floor(index / 3)][index % 3] = Number(numberEntered);

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
          } else {
            alert(
              "Invalid number! Please enter a number between 1 and 3, and make sure it hasn't been entered in the same row or column."
            );
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
// Check for a winning combination
function getWinner() {
  const winningCombinations = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const combination of winningCombinations) {
    const [pos1, pos2, pos3] = combination;
    const cell1 = cells[pos1[0] * 3 + pos1[1]];
    const cell2 = cells[pos2[0] * 3 + pos2[1]];
    const cell3 = cells[pos3[0] * 3 + pos3[1]];

    const symbol1 = cell1.textContent.charAt(0);
    const symbol2 = cell2.textContent.charAt(0);
    const symbol3 = cell3.textContent.charAt(0);

    if (
      symbol1 === 'X' &&
      symbol2 === 'X' &&
      symbol3 === 'X'
    ) {
      return 'X';
    }

    if (
      symbol1 === 'O' &&
      symbol2 === 'O' &&
      symbol3 === 'O'
    ) {
      return 'O';
    }
  }

  return null;
}

// Check if a cell value is a number
function isNumber(cellValue) {
  return !isNaN(cellValue);
}


// Check if a cell value is a number
function isNumber(cellValue) {
  return !isNaN(cellValue);
}

    // Check if a number is valid (between 1 and 3)
    function isValidNumber(number) {
      return Number.isInteger(Number(number)) && Number(number) >= 1 && Number(number) <= 3;
    }

    // Check if a number is repeated in the same row or column
    function isNumberRepeated(number, row, column) {
      for (let i = 0; i < 3; i++) {
        if (numbersEntered[row][i] === Number(number) || numbersEntered[i][column] === Number(number)) {
          return true;
        }
      }
      return false;
    }