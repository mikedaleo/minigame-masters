const mongoose = require('mongoose'); // Import mongoose to create schema

// Define the Bet schema which will be embedded in the User schema
const BetSchema = new mongoose.Schema({
  gameId: { type: String, required: true }, // ID of the game
  unitsWagered: { type: Number, required: true }, // Amount of units wagered
  result: { type: String, enum: ['win', 'lose'], required: true }, // Result of the bet
  payout: { type: Number, required: true }, // Payout amount
}, { _id: false });

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // User's unique username
  email: { type: String, required: true, unique: true }, // User's unique email
  password: { type: String, required: true }, // User's password
  units: { type: Number, default: 100 }, // Initial units for each user
  bets: [BetSchema], // Array of bets made by the user
});

module.exports = mongoose.model('User', UserSchema); // Export the User model
