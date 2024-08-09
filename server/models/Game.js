const { Schema, model } = require('mongoose');

// Define the Game schema
const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: true
    },
  });

const Game = model('Game', gameSchema)
module.exports = Game;
