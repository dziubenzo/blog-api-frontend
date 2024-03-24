import { useEffect } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';

function App() {
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const navigate = useNavigate();

  // Redirect to '/posts' immediately
  // This ensures that the useNavigation hook combined with loaders work as I would like them to
  useEffect(() => {
    navigate('/posts');
  }, [navigate]);

  return (
    <>
      <header>Some header</header>
      <main>{isLoading ? 'Loading' : <Outlet />}</main>
      <footer>Some footer</footer>
    </>
  );
}

export default App;
