import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Games from './pages/Games';
import SinglePlayerGames from './pages/SinglePlayerGames.jsx';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Leaderboard from './pages/Leaderboard';
import SignUp from './components/Form/sign-up.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/games',
        element: <Games />
      }, {
        path: '/single',
        element: <SinglePlayerGames />
      }, {
        path: '/profile/:id',
        element: <Profile />
      }, {
        path: '/leaderboard',
        element: <Leaderboard />
      },
       {
        path: '/signup',
        element: <SignUp />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

