import React, { useState, useEffect } from 'react';
import socket from '../../socket';

const RoomManager = ({ setCurrentRoom, setGameStatus, setPlayer }) => {
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    socket.on('playerRole', (role) => {
      setPlayer(role);
      setGameStatus(`You are player ${role}`);
    });

    socket.on('roomCreated', (room) => {
      setCurrentRoom(room);
      setGameStatus(`Room ${room} created. Waiting for another player to join...`);
    });

    socket.on('roomJoined', (room) => {
      setCurrentRoom(room);
      setGameStatus(`Joined room ${room}. Waiting for another player to join...`);
    });

    socket.on('roomError', (error) => {
      setGameStatus(error);
    });

    return () => {
      socket.off('playerRole');
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('roomError');
    };
  }, [setCurrentRoom, setGameStatus, setPlayer]);

  const createRoom = () => {
    console.log(roomName)
    if (roomName) {
      socket.emit('createRoom', roomName);
    }
  };

  const joinRoom = () => {
    if (roomName) {
      socket.emit('joinRoom', roomName);
    }
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
          <button onClick={createRoom} className='btn'>Create Room</button>
          <button onClick={joinRoom} className='btn'>Join Room</button>
        </div>
      </div>
    </div>
  );
};

export default RoomManager;