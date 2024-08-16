import React, { useState, useEffect } from 'react';
import socket from '../../socket';

const TicTacToe = ({ currentRoom, player, setGameStatus }) => {
  const [board, setBoard] = useState(null);
  const [isTurn, setIsTurn] = useState(false);

  useEffect(() => {

    socket.on('gameStart', (board) => {
      console.log(board)
      setBoard(board);
    });

    socket.on('moveMade', (move) => {
      const newBoard = [...board];
      newBoard[move.index] = move.player;
      setBoard(newBoard);
    });
  }, []);

  const handleClick = (index) => {
    const IS_PLAYER_TURN = (player !== (xIsNext ? 'X' : 'O'))
    if (!player || board[index] || calculateWinner(board) || !IS_PLAYER_TURN) return;

    const currentPlayer = xIsNext ? 'X' : 'O';

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    socket.emit('makeMove', currentRoom, { index, player: currentPlayer });

    // set the board variable with the new board
    setBoard(newBoard);

    setXIsNext(!xIsNext); // Toggle the turn
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // const winner = calculateWinner(board);

  return (
    <div>
      <div className="board">
        {board ? board.map((value, index) => (
          <button
            key={index}
            className="button"
            onClick={() => handleClick(index)}  
            disabled = {isTurn ? '' : "disabled"}
          >
            {value}
          </button>
        )): ''}
      </div>
    </div>
  );
};

export default TicTacToe;

