import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Posts from './Posts';
import { postsLoader } from '../helpers';
import App from './App';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'posts',
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: 'posts/:postslug',
          element: <h1>Single post goes here</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
