import React, { useState, useEffect } from 'react';
import socket from '../../socket';

const TicTacToe = ({ currentRoom, player, setGameStatus }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);


  useEffect(() => {
    if (!currentRoom) return;

    socket.emit('joinRoom', currentRoom);

    socket.on('gameStart', ({ roles }) => {
      setBoard(Array(9).fill(null));
      // Determine who starts based on server's decision
      setXIsNext(roles[Object.keys(roles)[0]] === 'X');
      setGameStatus('Game started!');
    });

    socket.on('moveMade', (move) => {
      const newBoard = [...prevBoard];
      newBoard[move.index] = move.player;
      setBoard(newBoard);
      setXIsNext(move.player === 'O'); // Toggle next player
    });

    return () => {
      socket.off('gameStart');
      socket.off('moveMade');
    };
  }, [currentRoom, setGameStatus]);

  useEffect(() => {
    if (player) {
      console.log(`Player assigned: ${player}`);
    }
  }, [player]);

  const handleClick = (index) => {
    const IS_PLAYER_TURN = (player !== (xIsNext ? 'X' : 'O'))
    if (!player || board[index] || calculateWinner(board) || !IS_PLAYER_TURN) return;

    const currentPlayer = xIsNext ? 'X' : 'O';

    const newBoard = [...prevBoard];
    newBoard[index] = currentPlayer;

    socket.emit('makeMove', currentRoom, { index, player: currentPlayer });

    // set the board variable with the new board
    setBoard(newBoard);

    setXIsNext(!xIsNext); // Toggle the turn
  };

  const winner = calculateWinner(board);

  return (
    <div>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="button"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner ? (
        <h2 className="winner">Winner: {winner}</h2>
      ) : (
        <h2 className="next-player">Next Player: {xIsNext ? 'X' : 'O'}</h2>
      )}
    </div>
  );
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

export default TicTacToe;

