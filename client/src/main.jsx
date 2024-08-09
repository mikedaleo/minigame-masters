import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Games from './pages/Games';
import Profile from './pages/Profile';
import Error from './pages/Error';
import Leaderboard from './pages/Leaderboard';

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
        path: '/profile/:id',
        element: <Profile />
      }, {
        path: '/leaderboard',
        element: <Leaderboard />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

