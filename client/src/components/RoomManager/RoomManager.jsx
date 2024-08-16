import React, { useState, useEffect } from 'react';
import socket from '../../socket';

const RoomManager = ({ setCurrentRoom, setGameStatus, setPlayer, setPlayerCount }) => {
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    socket.on('playerRole', (role) => {
      setPlayer(role);
      setGameStatus(`You are player ${role}`);
    });

    socket.on('roomCreated', (room) => {
      console.log(`room from server ${room}`)
      joinRoom(room);
    });

    socket.on('roomJoined', (room) => {
      setCurrentRoom(room);
      setGameStatus(`Joined room ${room}. Waiting for another player to join...`);
    });

    socket.on('roomError', (error) => {
      setGameStatus(error);
    });

    socket.on('gameReady', () => {
      setGameStatus('Game Ready!');
    });

    // return () => {
    //   socket.off('playerRole');
    //   socket.off('roomCreated');
    //   socket.off('roomJoined');
    //   socket.off('roomError');
    //   socket.off('gameStart');
    // };
  }, []);

  const createRoom = () => {
    socket.emit('createRoom', roomName);
  };

  const joinRoom = (room) => {
    console.log(room)
    socket.emit('joinRoom', room);
  };

  return (
    <div className='container'>
      <div className='room-container'>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
        />
        <div>
          <button type="button" onClick={createRoom} className='btn' disabled={roomName ? '' : "disabled"}>Create Room</button>
          <button type="button" onClick={() => joinRoom(roomName)} className='btn' disabled={roomName ? '' : "disabled"}>Join Room</button>
        </div>
      </div>
    </div>
  );
};

export default RoomManager;