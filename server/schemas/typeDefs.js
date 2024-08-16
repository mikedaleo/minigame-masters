const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    coins: Int!
  }
  type Auth {
  token: String!
  user: User
  }

  type Query {
    getUser(_id: ID!): User
    getUsers: [User]
  }
    

  type Mutation {
    login(username: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    updateCoins(userId: ID!, coins: Int!): User
  }
`;

module.exports = typeDefs;
