import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Posts from './Posts';
import dataLoader from '../loaders';
import App from './App';
import Post from './Post';

function Router() {
  const router = createBrowserRouter([
    {
      element: <App />,
      loader: dataLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Posts />,
          errorElement: <ErrorPage />,
        },
        {
          path: ':postSlug',
          element: <Post />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
