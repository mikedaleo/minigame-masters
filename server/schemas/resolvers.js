const { User, Game } = require('../models'); // Import the models

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id); // Find user by ID
    },
    getUsers: async () => {
      return await User.find(); // Get all users
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password, units: 100 });
      return await user.save(); // Create and save a new user
    },
  },
};

module.exports = resolvers; // Export the resolvers
