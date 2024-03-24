import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const { posts, comments } = useLoaderData();

  return (
    <>
      <header>
        <Header postsCount={posts.length} commentsCount={comments.length} />
      </header>
      <main>
        {isLoading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Outlet context={[posts, comments]} />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
