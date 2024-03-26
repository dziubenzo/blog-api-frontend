import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

function App() {
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const { allPosts, allComments } = useLoaderData();

  // Make posts and comments state for reactivity
  const [posts, setPosts] = useState(allPosts);
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <header>
        <Header postsCount={posts.length} commentsCount={comments.length} />
      </header>
      <main>
        {isLoading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Outlet context={[posts, setPosts, comments, setComments]} />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
