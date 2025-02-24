const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  if (!gameActive) return;

  // Mark the cell
  cell.textContent = currentPlayer;

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} Wins!`);
    highlightWinningCells(currentPlayer);
    return;
  }

  if (isDraw()) {
    endGame("It's a Draw!");
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for win
function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

// Highlight winning cells
function highlightWinningCells(player) {
  winningCombinations.forEach(combination => {
    if (combination.every(index => cells[index].textContent === player)) {
      combination.forEach(index => cells[index].classList.add('winning-cell'));
    }
  });
}

// Check for draw
function isDraw() {
  return [...cells].every(cell => cell.textContent);
}

// End game
function endGame(message) {
  gameActive = false;
  statusText.textContent = message;
}

// Reset game
resetButton.addEventListener('click', resetGame);

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's Turn`;
}
