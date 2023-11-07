import React, { useState } from 'react';
import chalkboard from "./assets/chalkboard.svg";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const isBoardFull = () => {
    return board.every((square) => square !== null);
  };

  const handleClick = (i) => {
    const newBoard = board.slice();
    if (calculateWinner() || newBoard[i]) return;
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    const squareValue = board[i];

    const squareClasses = `square ${squareValue === 'X' ? 'bg-white text-center text-4xl opacity-75 text-red-500' : 'bg-white text-center text-4xl opacity-75 text-blue-500'}`;

    return (
      <button className={squareClasses} onClick={() => handleClick(i)}>
        {squareValue}
      </button>
    );
  };

  const winner = calculateWinner();
  const isDraw = isBoardFull() && !winner;

  let status;
  if (winner) {
    status = `Congratulations! You're the Tic-Tac-Toe Master, Player ${winner}`;
  } else if (isDraw) {
    status = "Oops, no winner this time";
  } else {
    status = `Player: ${xIsNext ? 'X' : 'O'}`;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game bg-chalkboard w-screen h-screen text-white relative overflow-hidden">
      <img src={chalkboard} className='min-h-screen min-w-screen object-cover'/>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
        <h1 className='text-xl'>Tic Tac Toe</h1>
        <div className="game-board flex flex-col">
          <div className="board-row flex">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row flex">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row flex">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info flex flex-col items-center justify-center text-center">
          <div>{status}</div>
          <button
            className={`bg-blue-500 text-white px-2 py-1 mt-2 ${!winner && !isDraw ? 'invisible' : ''}`}
            onClick={resetGame}
          >
            Play Again?
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
