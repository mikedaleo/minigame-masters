// socket.js
import io from 'socket.io-client';

const socket = io('https://minigame-masters.onrender.com'); // Connect to backend

export default socket;