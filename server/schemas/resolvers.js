const { User } = require('../models'); // Import the models

const resolvers = {
  Query: {
    getUser: async (parent, { _id }) => {
      return await User.findById(_id); // Find user by ID
    },
    getUsers: async () => {
      return await User.find(); // Get all users
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = new User({ username, email, password });
      return await user.save(); // Create and save a new user
    },
    updateCoins: async (parent, { userId, coins }) => {
      return User.findOneAndUpdate(
        {_id: userId },
        {
          $addToSet: { coins: coins },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers; // Export the resolvers
