import { Link } from 'react-router-dom';
import React from 'react';


function Nav() {
    return (
        <nav>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>
    );
  }

  export default Nav;