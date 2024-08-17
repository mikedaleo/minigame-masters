import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';


function Leaderboard() {
    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return <p>Loading...</p>;
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const users = data.getUsers;
    console.log("username:", users);
    let counter = 1;

    return (
        <>
            <table border="1">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Coins</th>
                    </tr>
                    {
                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{counter++}</td>
                                    <td>{user.username}</td>
                                    <td>{user.coins}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>



    );
}


export default Leaderboard;