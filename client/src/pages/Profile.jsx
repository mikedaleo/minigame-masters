import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import { useParams } from 'react-router-dom';


function Profile() {

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { _id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const user = data.getUser;

    return (
        <>
            <h1 style={{ color: 'black', fontWeight: 'bold' }}>MINIGAME MASTERS PROFILE</h1>
            <div>
                <h2>Username: {user.username}</h2>
                <p>Email: {user.email}</p>
                <p>Coins: {user.coins}</p>
            </div>
        </>
    );
}

export default Profile;
