import { Outlet } from 'react-router-dom';
// import Nav from './components/Navbar/Nav';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql'
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <Header />
      {/* <Nav /> */}
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;