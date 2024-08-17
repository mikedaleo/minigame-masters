import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import Auth from '../../utils/auth';

function Nav() {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className="links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to="/games" className={isActive('/games') ? 'active' : ''}>Multiplayer</Link>
        <Link to="/single" className={isActive('/single') ? 'active' : ''}>Single Player</Link>
        <Link to="/leaderboard" className={isActive('/leaderboard') ? 'active' : ''}>Leaderboard</Link>

        {Auth.loggedIn() ? (
          <>
            <Link to={`/profile/${Auth.getProfile().data._id}`}>{Auth.getProfile().data.username}</Link>
            <Link onClick={Auth.logout}>Logout</Link>
          </>

        ) : (<Link to="/signup" className={isActive('/signup') ? 'active' : ''}>Sign Up</Link>)}

      </div>
    </nav>
  );
}

export default Nav;