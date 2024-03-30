import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { getThemeFromLocalStorage } from '../helpers';

function App() {
  const { state } = useNavigation();
  const isLoading = state === 'loading';
  const { allPosts, allComments } = useLoaderData();

  // Make posts and comments state for reactivity
  const [posts, setPosts] = useState(allPosts);
  const [comments, setComments] = useState(allComments);

  // Update state whenever there are changes to content on the Admin site
  useEffect(() => {
    setPosts(allPosts);
    setComments(allComments);
  }, [allPosts, allComments]);

  // State for manipulating app colour theme
  const [isDarkMode, setIsDarkMode] = useState(getThemeFromLocalStorage());

  return (
    <>
      <header>
        <Header postsCount={posts.length} commentsCount={comments.length} />
      </header>
      <main>
        {isLoading ? (
          <h1 className="loading-message">Loading posts...</h1>
        ) : (
          <Outlet context={{ posts, setPosts, comments, setComments }} />
        )}
      </main>
      <footer>
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </footer>
    </>
  );
}

export default App;
