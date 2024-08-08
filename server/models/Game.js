const mongoose = require('mongoose'); // Import mongoose to create schema

// Define the Game schema
const GameSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the game
  description: { type: String, required: true }, // Description of the game
  rules: { type: String, required: true }, // Rules of the game
});

module.exports = mongoose.model('Game', GameSchema); // Export the Game model
