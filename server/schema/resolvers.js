const { User, Game } = require('../models'); // Import the models

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id); // Find user by ID
    },
    getUsers: async () => {
      return await User.find(); // Get all users
    },
    getGame: async (_, { id }) => {
      return await Game.findById(id); // Find game by ID
    },
    getGames: async () => {
      return await Game.find(); // Get all games
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password, units: 100 });
      return await user.save(); // Create and save a new user
    },
    placeBet: async (_, { userId, gameId, unitsWagered, result, payout }) => {
      const user = await User.findById(userId);
      if (!user || user.units < unitsWagered) throw new Error('Insufficient units or user not found');
      
      user.units += result === 'win' ? payout : -unitsWagered;
      user.bets.push({ gameId, unitsWagered, result, payout });
      await user.save(); // Update user with bet details
      
      return user;
    },
    createGame: async (_, { name, description, rules }) => {
      const game = new Game({ name, description, rules });
      return await game.save(); // Create and save a new game
    },
  },
};

module.exports = resolvers; // Export the resolvers
