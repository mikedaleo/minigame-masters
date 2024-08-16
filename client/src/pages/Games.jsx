import React, { useState } from 'react';
import RoomManager from '../components/RoomManager/RoomManager';
import Game from '../components/TicTacToe/TicTacToe';
import '../App.css'; // Import the CSS file

const Games = () => {
  const [currentRoom, setCurrentRoom] = useState('');
  const [player, setPlayer] = useState(null);
  const [gameStatus, setGameStatus] = useState('Enter a room to start playing...');
  const [playerCount, setPlayerCount] = useState(0);

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <RoomManager
        setCurrentRoom={setCurrentRoom}
        setGameStatus={setGameStatus}
        setPlayer={setPlayer}
        setPlayerCount={setPlayerCount}
      />
      {currentRoom && gameStatus === 'Game Ready!' ? (
        <Game
          currentRoom={currentRoom}
          player={player}
          setGameStatus={setGameStatus}
        />
      ) : (
        <p>{gameStatus}</p>
      )}
    </div>
  );
}

export default Games;