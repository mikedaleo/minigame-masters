// socket.js
import io from 'socket.io-client';


const socket = io(process.env.RENDER_URL || 'http://localhost:3001'); // Connect to backend

export default socket;