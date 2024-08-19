// socket.js
import io from 'socket.io-client';


const socket = io(process.env.SOCKET_URL); // Connect to backend

export default socket;