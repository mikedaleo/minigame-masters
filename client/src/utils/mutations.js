import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password){
            token 
            user {
                _id
                username
                }
            }
        }
    `

export const UPDATE_COINS = gql`
    mutation updateCoins($userId: ID!, $coins: Int!) {
        updateCoins(userId: $userId, coins: $coins) {
            user {
                _id
                username
                coins
            }
        }
    }
`