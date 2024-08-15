const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// commenting this out in the meantime to test creating a user, not sure if we are using bet schema or not.
// -----------------------------------------------------------------------
// Define the Bet schema which will be embedded in the User schema
// const betSchema = new Schema({
//   gameId: { type: String, required: true }, // ID of the game
//   unitsWagered: { type: Number, required: true }, // Amount of units wagered
//   result: { type: String, enum: ['win', 'lose'], required: true }, // Result of the bet
//   payout: { type: Number, required: true }, // Payout amount
// }, { _id: false });
// ------------------------------------------------------------------------

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true
    },
    coins: { type: Number, default: 100 },
  });

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
