import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';
import Header from './components/Header/header';


function App() {

  return (
    <>

      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;