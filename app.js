// Select all elements needed for the game
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let playerModal = document.querySelector("#player-modal");
let startGameBtn = document.querySelector("#start-game-btn");
let winnerModal = document.querySelector("#winner-modal");
let winnerText = document.querySelector("#winner-text");
let closeWinnerModalBtn = document.querySelector("#close-winner-modal-btn");

// Initialize player names, game state, and turn indicator
let player1Name = "";
let player2Name = "";
let turnO = true; // true for player 1's turn (O), false for player 2's turn (X)
let gameWon = false;

// Define winning patterns
const winPatterns = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

// Show the player name modal when the page loads
window.onload = () => {
  playerModal.style.display = "flex";
};

// Start the game when the start button is clicked
startGameBtn.addEventListener("click", () => {
  player1Name = document.querySelector("#player1").value;
  player2Name = document.querySelector("#player2").value;

  // Check if both player names are entered
  if (player1Name && player2Name) {
    playerModal.style.display = "none";
  } else {
    alert("Please enter names for both players.");
  }
});

// Add click event listener to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (gameWon) return; // Ignore clicks if the game is already won

    // Mark the box with the current player's symbol
    if (turnO) {
      box.innerText = "O";
      turnO = false; // Switch turn to X
    } else {
      box.innerText = "X";
      turnO = true; // Switch turn to O
    }
    box.disabled = true; // Disable the clicked box

    checkWinner(); // Check if the game has a winner or a draw
  });
});

// Check for a winner or a draw
const checkWinner = () => {
  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    const boxA = boxes[a].innerText;
    const boxB = boxes[b].innerText;
    const boxC = boxes[c].innerText;

    // Check if all three boxes in the pattern have the same symbol
    if (boxA && boxA === boxB && boxA === boxC) {
      const winnerName = boxA === "O" ? player1Name : player2Name;
      winnerText.innerText = `${winnerName} wins!`;
      winnerModal.style.display = "flex";
      gameWon = true; // Set game state to won
      disableAllBoxes(); // Disable all boxes
    }
  });

  // Check for a draw if no winner and all boxes are filled
  if (!gameWon && [...boxes].every((box) => box.innerText !== "")) {
    winnerText.innerText = "It's a draw!";
    winnerModal.style.display = "flex";
  }
};

// Disable all boxes to prevent further clicks
const disableAllBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Reset the game when the reset button is clicked
resetbtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false; // Enable all boxes
  });
  gameWon = false; // Reset game state
  turnO = true; // Set to player 1's turn
  playerModal.style.display = "flex"; // Show player name modal
});

// Close the winner modal when the close button is clicked
closeWinnerModalBtn.addEventListener("click", () => {
  winnerModal.style.display = "none";
});
