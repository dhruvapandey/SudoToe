const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const playerXNumbersDisplay = document.getElementById('playerXNumbers');
const playerONumbersDisplay = document.getElementById('playerONumbers');
let currentPlayer = 'X';
let board = [[null, null, null], [null, null, null], [null, null, null]];
let numbersEntered = [[null, null, null], [null, null, null], [null, null, null]];
let playerXNumbers = [1,2,3,1,3];
let playerONumbers = [1,2,2,3];

// Generate random numbers for Player X
for (let i = 0; i < 5; i++) {
  //playerXNumbers.push(generateRandomNumbers());
}

// Generate random numbers for Player O
for (let i = 1; i < 1; i++) {
  const numbers = [1, 2, 3, 1];
  const counts = countNumbers(playerXNumbers);
  
  if((counts[1]==0)&&(counts[2] == 3))
    numbers = [1,1,1,3];
  else if((counts[1]==0)&&(counts[3] == 3))
    numbers = [1,1,1,2];
  else if((counts[2]==0)&&(counts[3] == 3))
    numbers = [2,2,2,1];
  else if((counts[2]==0)&&(counts[1] == 3))
    numbers = [1,2,2,3];
  else if((counts[3]==0)&&(counts[2] == 3))
    numbers = [3,3,3,1];
  else if((counts[3]==0)&&(counts[1] == 3))
    numbers = [3,3,3,2];
  else if ((counts[1]==3)&&(counts[2]==1))
    numbers = [2,2,3,3];
  else if ((counts[2]==3)&&(counts[1]==1))
    numbers = [1,1,3,3];
  else if ((counts[3]==3)&&(counts[2]==1))
    numbers = [1,1,2,2];
  else if ((counts[1]==3)&&(counts[2]==2))
    numbers = [3,3,3,2];
  else if ((counts[1]==3)&&(counts[3]==2))
    numbers = [2,2,2,3];
  else if ((counts[2]==3)&&(counts[1]==2))
    numbers = [3,3,3,1];
  else if ((counts[2]==3)&&(counts[3]==2))
    numbers = [1,1,1,3];
  else if ((counts[3]==3)&&(counts[1]==2))
    numbers = [2,2,2,1];
  else if ((counts[3]==3)&&(counts[2]==2))
    numbers = [1,1,1,2];
  else if ((counts[1]==2)&&(counts[2]==2))
    numbers = [1,2,3,3];
  else if ((counts[1]==2)&&(counts[3]==2))
    numbers = [1,2,2,3];
  else if ((counts[2]==2)&&(counts[3]==2))
    numbers = [1,1,2,3];
  else 
    numbers = [1,2,3,1];
  
  shuffleArray(numbers);
  playerONumbers.push(numbers);
}


// Display the generated numbers for Player X and O
playerXNumbersDisplay.textContent = "Player X Numbers: " + playerXNumbers.join(", ");
playerONumbersDisplay.textContent = "Player O Numbers: " + playerONumbers.join(", ");

// Add click event listeners to cells
// Add click event listeners to cells
// Add click event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!boardIsFull() && !getWinner() && board[Math.floor(index / 3)][index % 3] === null) {
      let numberEntered;
      if (currentPlayer === 'X') {
        numberEntered = prompt(`Enter a number from PlayerXNumbers: ${playerXNumbers}`);
        // Check if the entered number is present in playerXNumbers and not repeated in the same row
        if (!playerXNumbers.includes(Number(numberEntered)) || isNumberRepeated(numberEntered, Math.floor(index / 3), index % 3)) {
          alert('Invalid number! Please enter a valid number from PlayerXNumbers.');
          return;
        }
        // Remove the used number from playerXNumbers
        const numberIndex = playerXNumbers.indexOf(Number(numberEntered));
        if (numberIndex !== -1) {
          playerXNumbers.splice(numberIndex, 1);
        }
      } else {
        numberEntered = prompt(`Enter a number from PlayerONumbers: ${playerONumbers}`);
        // Check if the entered number is present in playerONumbers and not repeated in the same row
        if (!playerONumbers.includes(Number(numberEntered)) || isNumberRepeated(numberEntered, Math.floor(index / 3), index % 3)) {
          alert('Invalid number! Please enter a valid number from PlayerONumbers.');
          return;
        }
        // Remove the used number from playerONumbers
        const numberIndex = playerONumbers.indexOf(Number(numberEntered));
        if (numberIndex !== -1) {
          playerONumbers.splice(numberIndex, 1);
        }
      }

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
      playerXNumbersDisplay.textContent = "Player X Numbers: " + 
      playerXNumbers.join(", ");
      playerONumbersDisplay.textContent = "Player O Numbers: " + 
      playerONumbers.join(", ");

      // Check if there are no valid moves left
      if (!validMovesLeft(currentPlayer)) {
        console.log("No valid moves left. Restarting the game.");
        resetGame();
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

// Generate a random number between 1 and 3, ensuring it is not repeated more than three times
// Generate random numbers for player X and player O
// Generate random numbers for player X or player O
function generateRandomNumbers() {
  const numbers = [1, 2, 3];
  shuffleArray(numbers);
  return numbers.pop();
}

// Shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Count the occurrences of numbers in an array
function countNumbers(numbers) {
  const counts = {};

  for (const number of numbers) {
    counts[number] = counts[number] ? counts[number] + 1 : 1;
  }

  return counts;
}
// Check if there are valid moves left for the given player
function validMovesLeft(player) {
  const numbers = player === 'X' ? playerXNumbers : playerONumbers;
  for (let number of numbers) {
    let isNumberAvailable = true;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] && board[row][col].number === number && isNumberRepeated(number, row, col)) {
          isNumberAvailable = false;
          break;
        }
      }
      if (!isNumberAvailable) {
        break;
      }
    }
    if (isNumberAvailable) {
      return true;
    }
  }
  return false;
}
// Check if the number is available in the board
function isNumberAvailable(number) {
  for (let row of board) {
    for (let cell of row) {
      if (cell && cell.number === number) {
        return false;
      }
    }
  }
  return true;
}
// Reset the game
function resetGame() {
  currentPlayer = 'X';
  board = [[null, null, null], [null, null, null], [null, null, null]];
  numbersEntered = [[null, null, null], [null, null, null], [null, null, null]];
  playerXNumbers = [1, 1, 2, 3, 2]; // Example playerXNumbers
  playerONumbers = [1, 2, 3, 3]; // Example playerONumbers
  cells.forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('X', 'O');
  });
  resultDisplay.textContent = `Player X Numbers: ${playerXNumbers}\nPlayer O Numbers: ${playerONumbers}`;
}

