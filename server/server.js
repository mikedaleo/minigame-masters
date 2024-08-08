require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file

console.log("MONGODB_URI:", process.env.MONGODB_URI);

const mongoose = require('mongoose'); // Import mongoose for database interactions
const express = require('express'); // Import express to create the server
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer for GraphQL

const typeDefs = require('./schema/typeDefs'); // Import type definitions for GraphQL schema
const resolvers = require('./schema/resolvers'); // Import resolvers for GraphQL schema
const { User, Game } = require('./models'); // Import models from the index.js file

async function startServer() {
  const app = express(); // Initialize an Express application

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  }); // Create an ApolloServer instance with the schema and resolvers

  await server.start(); // Ensure the server is started before applying middleware
  server.applyMiddleware({ app }); // Apply the Apollo GraphQL middleware to the Express app

  const PORT = process.env.PORT || 5001; // Define the port from environment variables or default to 5001
  const MONGODB_URI = process.env.MONGODB_URI; // Get the MongoDB URI from environment variables

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // Connect to the MongoDB database

  app.listen({ port: PORT }, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  ); // Start the server and log the URL
}

startServer(); // Call the function to start the server
