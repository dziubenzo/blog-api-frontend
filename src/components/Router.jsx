import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Posts from './Posts';
import { dataLoader } from '../helpers';
import App from './App';
import Post from './Post';

function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <ErrorPage />,
      loader: dataLoader,
      children: [
        {
          path: '/',
          element: <Posts />,
        },
        {
          path: ':postSlug',
          element: <Post />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
