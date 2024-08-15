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
      if (!rooms[roomName]) {
        rooms[roomName] = {
          players: [], 
          board: Array(9).fill(null),
          playerRoles: {}
        };
        socket.join(roomName);
        io.to(socket.id).emit('roomCreated', roomName);
        console.log(`Room ${roomName} created`);
      } else {
        io.to(socket.id).emit('roomError', 'Room already exists');
      }
    });

    socket.on('joinRoom', (roomName) => {
      if (rooms[roomName]) {
        const room = rooms[roomName];
        if (room.players.length < 2) {
          room.players.push(socket.id);
          socket.join(roomName);
          socket.emit('roomJoined', roomName);
          if (room.players.length === 2) {
            const [player1, player2] = room.players;
            io.to(player1).emit('playerRole', 'X');
            io.to(player2).emit('playerRole', 'O');
            io.to(roomName).emit('gameStart');
          }
          console.log(`Player joined room ${roomName}`);
        } else {
          socket.emit('roomError', 'Room is full');
        }
      } else {
        socket.emit('roomError', 'Room does not exist');
      }
    });

    socket.on('makeMove', (roomName, move) => {
      if (rooms[roomName] && rooms[roomName].players.includes(socket.id)) {
        const { index, player } = move;
        if (rooms[roomName].board[index] === null) {
          rooms[roomName].board[index] = player;
          io.to(roomName).emit('moveMade', move);
          
          // Check for a winner or draw
          const winner = calculateWinner(rooms[roomName].board);
          if (winner) {
            io.to(roomName).emit('gameOver', { winner });
          } else if (rooms[roomName].board.every(cell => cell !== null)) {
            io.to(roomName).emit('gameOver', { winner: 'Draw' });
          }
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Clean up room data if needed
      for (const [roomName, roomData] of Object.entries(rooms)) {
        const playerIndex = roomData.players.indexOf(socket.id);
        if (playerIndex !== -1) {
          roomData.players.splice(playerIndex, 1);
          delete roomData.playerRoles[socket.id];
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


