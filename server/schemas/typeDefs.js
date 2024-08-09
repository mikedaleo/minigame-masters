const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    units: Int!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getGame(id: ID!): Game
    getGames: [Game]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
