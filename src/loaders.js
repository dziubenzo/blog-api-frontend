import API_URL from './API';

// Fetch all posts and comments
async function dataLoader() {
  try {
    const [responsePosts, responseComments] = await Promise.all([
      fetch(`${API_URL}/posts`),
      fetch(`${API_URL}/posts/all/comments/all`),
    ]);
    if (!responsePosts.ok || !responseComments.ok) {
      throw new Error('Server error');
    }
    const [allPosts, allComments] = await Promise.all([
      await responsePosts.json(),
      await responseComments.json(),
    ]);
    return { allPosts, allComments };
  } catch (error) {
    return error;
  }
}

export default dataLoader;
