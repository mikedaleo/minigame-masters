const { User } = require('../models'); // Import the models
const { AuthenticationError, signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    getUser: async (parent, { _id }) => {
      return await User.findById(_id); // Find user by ID
    },
    getUsers: async () => {
      return await User.find().sort({ coins: -1, username: 1}); // Get all users
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user }; // Create and save a new user
    },
    updateCoins: async (parent, { userId, coins }) => {
      return User.findOneAndUpdate(
        {_id: userId },
        {
          $inc: { coins: 10 },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    login: async (parent, args) => {
      const {username, password } = args;
      const user = await User.findOne({ username });
      if (!user) {
        
          throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
          throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
  }
  
}
};

module.exports = resolvers; // Export the resolvers
