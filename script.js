// Connect to board container
const boardContainer = document.getElementById("chessBoard");

let selectedSquare = null;

function renderBoard() {
  boardContainer.innerHTML = "";

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const square = document.createElement("div");
      square.classList.add("chess-square");
      square.classList.add((x + y) % 2 === 0 ? "light" : "dark");
      square.dataset.x = x;
      square.dataset.y = y;

      const piece = board[x][y];
      if (piece) {
        square.textContent = getPieceUnicode(piece);
      }

      square.addEventListener("click", () => handleClick(x, y));
      boardContainer.appendChild(square);
    }
  }
}

function getPieceUnicode(piece) {
  const unicodePieces = {
    wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
    bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟"
  };
  return unicodePieces[piece] || "";
}

function handleClick(x, y) {
  if (!selectedSquare) {
    // First click - select a piece
    const piece = board[x][y];
    if (piece && piece[0] === currentPlayer) {
      selectedSquare = { x, y };
      highlightSelected(x, y);
    }
  } else {
    // Second click - try to move
    const { x: fromX, y: fromY } = selectedSquare;
    if (movePiece(fromX, fromY, x, y)) {
      renderBoard();
    }
    selectedSquare = null;
  }
}

function highlightSelected(x, y) {
  const squares = document.querySelectorAll(".chess-square");
  squares.forEach(sq => {
    if (parseInt(sq.dataset.x) === x && parseInt(sq.dataset.y) === y) {
      sq.classList.add("selected");
    } else {
      sq.classList.remove("selected");
    }
  });
}

// Initial render
renderBoard();
