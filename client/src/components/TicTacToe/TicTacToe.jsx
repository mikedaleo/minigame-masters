import React, { useState, useEffect } from 'react';
import socket from '../../socket';
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';


const TicTacToe = ({ currentRoom }) => {
  const [board, setBoard] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [role, setRole] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [updateCoins] = useMutation(UPDATE_COINS);


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
      setGameResult(null); // Reset game result on new game start
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

    socket.on('gameOver', (result) => {
      setGameResult(result.winner);
    });
  }, []);



  const handleClick = (index) => {
    if (gameResult || !isTurn) { // Don't allow moves if the game is over
      return;
    }
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

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameResult(winner);

      console.log(winner);

      if (winner === role){
        
        console.log(Auth.getProfile().data);
        try {
           updateCoins({
            variables: {
              userId: Auth.getProfile().data._id,
              coins: Auth.getProfile().data.coins,
            },
          });
        } catch (error) {
          console.error('Error updating coins:', error);
        }

      }

    } else if (newBoard.every(cell => cell !== null)) {
      setGameResult('Draw');
    }
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
      {gameResult && (
        <div className="gameResult">
          <h2>{gameResult === 'Draw' ? 'It\'s a Draw!' : `Player ${gameResult} Wins!`}</h2>
        </div>
      )}
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

