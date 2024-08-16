import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Nav() {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div id="links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to="/games" className={isActive('/games') ? 'active' : ''}>Games</Link>
        <Link to="/single" className={isActive('/single') ? 'active' : ''}>Single Player</Link>
        <Link to="/leaderboard" className={isActive('/leaderboard') ? 'active' : ''}>Leaderboard</Link>
        <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>Sign Up</Link>
        <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
        <Link to="/logout" className={isActive('/logout') ? 'active' : ''}>Logout</Link>
      </div>
    </nav>
  );
}

export default Nav;