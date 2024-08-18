import { Link } from 'react-router-dom';
import React from 'react';
import Nav from '../../components/Navbar/Nav'
import Auth from '../../utils/auth';


function Header() {
  return (
    <header>
      <Link to="/" id="logo">
        <img src="/logo.png" alt="Minigame Masters Logo" />
      </Link>
      {Auth.loggedIn() && (
      <Link to={`/profile/${Auth.getProfile().data._id}`}>
        <div className='coins-div'>
          <h2>{Auth.getProfile().data.username}:</h2>
          <img src="/coins.svg" alt="Minigame Masters Logo" />
          <h2>{Auth.getProfile().data.coins}</h2>
        </div>
      </Link>
      )}
      <Nav />
    </header>
  );
}

export default Header;