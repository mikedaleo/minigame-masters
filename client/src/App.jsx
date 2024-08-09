import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import Outlet from 'react-router-dom';

import './App.css'
// import Header from './components/Header/header';
import SignUp from './components/Form/sign-up';
import Login from './components/Form/login';
// import Footer from './components/Footer/footer';

function App() {

  return (
    <>
      <main>
        <SignUp />
        <Login />
      </main>
    </>
  )
}

export default App
