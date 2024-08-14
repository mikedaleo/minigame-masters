// server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const http = require('http');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { setupSocket } = require('./tictactoeserver'); // Import the function to set up Socket.IO

const app = express();
const PORT = process.env.PORT || 3001;

// Create an HTTP server
const server = http.createServer(app);

// Create an ApolloServer instance with the schema and resolvers
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await apolloServer.start(); // Ensure the server is started before applying middleware
  apolloServer.applyMiddleware({ app });

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Set up Socket.IO
  setupSocket(server);

  db.once('open', () => {
    server.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      console.log(`Socket.IO server running on port ${PORT}`);
    });
  });
};

startServer();

