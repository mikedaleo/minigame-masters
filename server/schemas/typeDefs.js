const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    coins: Int!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateCoins(userId: ID!, coins: Int!): User
  }
`;

module.exports = typeDefs;
