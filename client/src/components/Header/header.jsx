import { Link } from 'react-router-dom';
import React from 'react';
import Nav from '../../components/Navbar/Nav'
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils/queries';

function Header() {

  if (Auth.loggedIn()) {
    const { loading, error, data } = useQuery(GET_USER, {
      variables: { _id: Auth.getProfile().data._id },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const user = data.getUser;
    return (<header>
      <Link to="/" id="logo">
        <img src="/logo.png" alt="Minigame Masters Logo" />
      </Link>
      {Auth.loggedIn() && (
        <Link to={`/profile/${user._id}`}>
          <div className='coins-div'>
            <h2>{user.username}:</h2>
            <img src="/coins.svg" alt="Minigame Masters Logo" />
            <h2>{user.coins}</h2>
          </div>
        </Link>
      )}
      <Nav />
    </header>
    )
  } else {
    return (
      <header>
        <Link to="/" id="logo">
          <img src="/logo.png" alt="Minigame Masters Logo" />
        </Link>
        <Nav />
      </header>
    );
  }



}

export default Header;