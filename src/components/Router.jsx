import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Posts from './Posts';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Posts />,
      errorElement: <ErrorPage />,
    },
    {
      path: ':postslug',
      element: <h1>Single post goes here</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
