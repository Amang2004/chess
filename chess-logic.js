// Basic Chess Game Logic in JavaScript

const createInitialBoard = () => [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
  ];
  
  let board = createInitialBoard();
  let currentPlayer = "w";
  
  const isInsideBoard = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
  
  function movePiece(fromX, fromY, toX, toY) {
    const piece = board[fromX][fromY];
    const target = board[toX][toY];
  
    if (!piece || piece[0] !== currentPlayer) return false;
    if (!isValidMove(piece, fromX, fromY, toX, toY)) return false;
  
    // Execute move
    board[toX][toY] = piece;
    board[fromX][fromY] = "";
  
    // Switch player
    currentPlayer = currentPlayer === "w" ? "b" : "w";
    return true;
  }
  
  function isValidMove(piece, fromX, fromY, toX, toY) {
    const type = piece[1];
    const color = piece[0];
    const dx = toX - fromX;
    const dy = toY - fromY;
    const target = board[toX][toY];
  
    // Cannot capture own piece
    if (target && target[0] === color) return false;
  
    switch (type) {
      case "P": return isValidPawnMove(fromX, fromY, toX, toY, color);
      case "R": return isValidRookMove(fromX, fromY, toX, toY);
      case "N": return isValidKnightMove(dx, dy);
      case "B": return isValidBishopMove(fromX, fromY, toX, toY);
      case "Q": return isValidQueenMove(fromX, fromY, toX, toY);
      case "K": return isValidKingMove(dx, dy);
    }
    return false;
  }
  
  function isPathClear(fromX, fromY, toX, toY) {
    const dx = Math.sign(toX - fromX);
    const dy = Math.sign(toY - fromY);
    let x = fromX + dx, y = fromY + dy;
  
    while (x !== toX || y !== toY) {
      if (board[x][y] !== "") return false;
      x += dx;
      y += dy;
    }
    return true;
  }
  
  function isValidPawnMove(fromX, fromY, toX, toY, color) {
    const direction = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const target = board[toX][toY];
  
    if (dy === 0 && dx === direction && target === "") return true;
    if (dy === 0 && dx === 2 * direction && fromX === startRow && board[fromX + direction][fromY] === "" && target === "") return true;
    if (Math.abs(dy) === 1 && dx === direction && target && target[0] !== color) return true;
  
    return false;
  }
  
  function isValidRookMove(fromX, fromY, toX, toY) {
    return (fromX === toX || fromY === toY) && isPathClear(fromX, fromY, toX, toY);
  }
  
  function isValidKnightMove(dx, dy) {
    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }
  
  function isValidBishopMove(fromX, fromY, toX, toY) {
    return Math.abs(toX - fromX) === Math.abs(toY - fromY) && isPathClear(fromX, fromY, toX, toY);
  }
  
  function isValidQueenMove(fromX, fromY, toX, toY) {
    return isValidRookMove(fromX, fromY, toX, toY) || isValidBishopMove(fromX, fromY, toX, toY);
  }
  
  function isValidKingMove(dx, dy) {
    return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  }
  
  // To use:
  // movePiece(6, 0, 4, 0); // Move white pawn from a2 to a4
  // console.table(board);
  