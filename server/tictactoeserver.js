// tictactoeserver.js
const socketIo = require('socket.io');

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "https://minigame-masters.onrender.com/", // Allow your front-end origin
      methods: ["GET", "POST"],
    }
  });

  const rooms = {};

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('createRoom', (roomName) => {
      if (!rooms[roomName]) {
        rooms[roomName] = { players: [], board: Array(9).fill(null) };
        socket.join(roomName);
        io.to(socket.id).emit('roomCreated', roomName);
        console.log(`Room ${roomName} created`);
      } else {
        io.to(socket.id).emit('roomError', 'Room already exists');
      }
    });

    // TEST

    socket.on('joinRoom', (roomName) => {
      if (rooms[roomName]) {
        if (rooms[roomName].players.length < 2) {
          rooms[roomName].players.push(socket.id);
          socket.join(roomName);
          io.to(socket.id).emit('roomJoined', roomName);
          if (rooms[roomName].players.length === 2) {
            io.to(roomName).emit('gameStart');
          }
        } else {
          io.to(socket.id).emit('roomError', 'Room is full');
        }
      } else {
        io.to(socket.id).emit('roomError', 'Room does not exist');
      }
    });

    socket.on('gameStart', (roomName) => {
      io.to(roomName).emit('gameStart');
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
    });
  });
};

module.exports = { setupSocket };

