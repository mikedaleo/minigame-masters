import { Link } from 'react-router-dom';
import React from 'react';
import Nav from '../../components/Navbar/Nav'


function Header() {
  return (
    <header>
      <Link to="/" id="logo">
        <img src="/logo.png" alt="Minigame Masters Logo" />
      </Link>
      <Nav />
    </header>
  );
}

export default Header;