const { Server } = require('socket.io');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://minigame-masters.onrender.com/", 'http://localhost:3000'], // Allow your front-end origin
      methods: ["GET", "POST"],
    }
  });

  const rooms = {};

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('createRoom', (roomName) => {
      // Create a Room if it doesn't exist
      if (!rooms[roomName]) {
        rooms[roomName] = {
          players: [],  // socket id's
          board: Array(9).fill(null)
        };
        // This is so you subscribe to the socket to the room
        // handles events which get emit from the room 
        socket.join(roomName);

        io.to(socket.id).emit('roomCreated', roomName);
        console.log(`Room ${roomName} created`);
      } else {
        io.to(socket.id).emit('roomError', 'Room already exists');
      }
    });

    socket.on('joinRoom', (roomName) => {
      // if the room exists
      const gameData = rooms[roomName];
      const ROOM_IS_FULL = gameData && gameData.players.length === 2;
      const ROOM_IS_EMPTY = gameData && gameData.players.length === 0;
      if (!gameData) {
        socket.emit('roomError', 'Room does not exist')
        return;
      }
      if (ROOM_IS_FULL) {
        socket.emit('roomError', 'Room is full');
        return;
      }
      if (ROOM_IS_EMPTY) {
        gameData.players.push({
          id: socket.id,
          role: 'X'
        }
        );
        socket.emit('roomJoined', roomName);

        console.log(`Player joined room ${roomName}`);
        return;
      }

      gameData.players.push({
        id: socket.id,
        role: 'O'
      }
      );
      socket.join(roomName);
      socket.emit('roomJoined', roomName);

      console.log(`Player joined room ${roomName}`);
      console.log(gameData);

      io.to(roomName).emit('gameReady');

      io.to(roomName).emit('gameStart', gameData);
    });

    socket.on('makeMove', ( newBoard, id, currentRoom ) => {
          io.to(currentRoom).emit('moveMade', newBoard, id);
          console.log(currentRoom)

          // Check for a winner or draw
          const winner = calculateWinner(newBoard);
          if (winner) {
            io.to(currentRoom).emit('gameOver', { winner });
          } else if (newBoard.every(cell => cell !== null)) {
            io.to(currentRoom).emit('gameOver', { winner: 'Draw' });
          }
        }
    );

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Clean up room data if needed
      for (const [roomName, roomData] of Object.entries(rooms)) {
        const playerIndex = roomData.players.indexOf(socket.id);
        if (playerIndex !== -1) {
          roomData.players.splice(playerIndex, 1);
          if (roomData.players.length === 0) {
            delete rooms[roomName]; // Delete room if no players
          } else {
            // Notify remaining player(s) about the disconnection
            io.to(roomName).emit('playerDisconnected');
          }
          break;
        }
      }
    });
  });
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

module.exports = { setupSocket };


