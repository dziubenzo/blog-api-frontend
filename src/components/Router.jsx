import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Posts from './Posts';
import { dataLoader } from '../helpers';
import App from './App';

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
          path: ':postslug',
          element: <h1>Single post goes here</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
