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

  const renderSquare = (i, withRightBorder) => {
    const squareValue = board[i];

    const squareClasses = `square ${squareValue === 'X' ? 'text-7xl text-[#fba1bf]' : 'text-7xl text-[#7fcbf6]'} ${withRightBorder ? 'border-r-4 border-[#e0dfdb]' : ''}`;

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
    status = (
      <div>
        You're the Tic-Tac-Toe Master,
        <br />
        <span className={`text-${winner === 'X' ? '[#fba1bf]' : '[#7fcbf6]'}`}>Player {winner}!</span>
      </div>
    );
  } else if (isDraw) {
    status = "Oops, no winner this time";
  } else {
    status = (
      <div>
        Your turn,
        <br />
        <span className={`text-${xIsNext ? '[#fba1bf]' : '[#7fcbf6]'}`}>Player {xIsNext ? 'X' : 'O'}</span>
      </div>
    );
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game bg-chalkboard w-screen h-screen text-white relative overflow-hidden">
      <img src={chalkboard} className='min-h-screen min-w-screen object-cover'/>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-80'>
        <h1 className='text-6xl font-bold underline'>Tic-Tac-Toe</h1>
        <div className="game-board flex flex-col my-8">
          <div className="board-row flex">
            {renderSquare(0, true)}
            {renderSquare(1, true)}
            {renderSquare(2)}
          </div>
          <div className="board-row flex">
            {renderSquare(3, true)}
            {renderSquare(4, true)}
            {renderSquare(5)}
          </div>
          <div className="flex">
            {renderSquare(6, true)}
            {renderSquare(7, true)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center text-4xl">
          <div className=''>{status}</div>
          <button
            className={`px-2 py-1 mt-4 border-b-4 border-transparent hover:border-[#e0dfdb] text-[#fcee87] ${!winner && !isDraw ? 'invisible' : ''}`}
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
