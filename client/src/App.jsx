import { Outlet } from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import './App.css';


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