const { gql } = require('apollo-server-express'); // Import gql from Apollo Server to define schema

const typeDefs = gql`
  type Bet {
    gameId: String!
    unitsWagered: Int!
    result: String!
    payout: Int!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    units: Int!
    bets: [Bet]
  }

  type Game {
    id: ID!
    name: String!
    description: String!
    rules: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getGame(id: ID!): Game
    getGames: [Game]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    placeBet(userId: ID!, gameId: String!, unitsWagered: Int!, result: String!, payout: Int!): User
    createGame(name: String!, description: String!, rules: String!): Game
  }
`;

module.exports = typeDefs; // Export the type definitions
