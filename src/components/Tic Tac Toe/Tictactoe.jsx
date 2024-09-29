import React, { useState } from 'react';
import './Tictactoe.css';
import circle from '../Assets/circle.png';
import cross from '../Assets/cross.png';

const Tictactoe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner); // Set the winner in state
    }
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsXNext(true);
    setWinner(null); // Reset the winner state
  };

  return (
    <div className="container">
      <h1 className="tittle">Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleClick(index)}
          >
            {value === "X" && <img src={cross} alt="Cross" />}
            {value === "O" && <img src={circle} alt="Circle" />}
          </div>
        ))}
      </div>
      
      {/* Custom message showing the winner */}
      {winner && (
        <div className="winner-message">
          <span className="winner-text">{winner} wins the Game!</span>
        </div>
      )}
      
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default Tictactoe;
