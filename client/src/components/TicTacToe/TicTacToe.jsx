import React, { useState, useEffect } from 'react';
import socket from '../../socket';

const TicTacToe = ({ currentRoom }) => {
  const [board, setBoard] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {

    socket.on('gameStart', (gameData) => {
      console.log(gameData)
      const gamePlayers = gameData.players
      gamePlayers.forEach(player => {
        if (player.id !== socket.id) {
          return;
        }
        setRole(player.role)
        if (player.role === 'O') {
          return;
        }
        setIsTurn(true);
      });
      localStorage.setItem('players', JSON.stringify(gameData.players))
      setBoard(gameData.board);
    });

    socket.on('moveMade', (newBoard, id) => {
      const players = JSON.parse(localStorage.getItem('players'));
      players.forEach(player => {
        console.log(player.id)
        console.log(id)
        if (socket.id === id) {
          return;
        }
        setIsTurn(true);
        setBoard(newBoard);
      });
    });
  }, []);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] !== null) {
      return
    }
    newBoard[index] = role;

    // Emit new board to the other players
    socket.emit('makeMove', newBoard, socket.id, currentRoom)
    // update our board
    setIsTurn(false);
    setBoard(newBoard);

    // const currentPlayer = xIsNext ? 'X' : 'O';

    // const newBoard = [...board];
    // newBoard[index] = currentPlayer;

    // socket.emit('makeMove', currentRoom, { index, player: currentPlayer });

    // // set the board variable with the new board
    // setBoard(newBoard);

    // setXIsNext(!xIsNext); // Toggle the turn
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
            disabled={isTurn ? '' : "disabled"}
          >
            {value}
          </button>
        )) : ''}
        <h3>Your Role Is: {role}</h3>
        {isTurn ? (
          <p>It is your turn</p>
        ) : (
          <p>It is the other player's turn</p>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;

