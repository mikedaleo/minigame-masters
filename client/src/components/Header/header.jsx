import { Link } from 'react-router-dom';
import React from 'react';

function Header() {
  return (
    <header>
      <Link to="/" id="logo">
        <img src="/logo.png" alt="Minigame Masters Logo" />
      </Link>
    </header>
  );
}

export default Header;