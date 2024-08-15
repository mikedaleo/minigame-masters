import { gql } from '@apollo/client';


export const GET_USER = gql`
  query GetUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      username
      email
      coins
    }
  }
`;

export const GET_USERS = gql`
    query GetUsers {
        getUsers {
        _id
        username
        email
        coins
        }
    }
    `;
