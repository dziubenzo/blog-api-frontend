// Fetch all posts and comments
export async function dataLoader() {
  try {
    const [responsePosts, responseComments] = await Promise.all([
      fetch('http://localhost:3000/posts'),
      fetch('http://localhost:3000/posts/all/comments/all'),
    ]);
    if (!responsePosts.ok || !responseComments.ok) {
      throw new Error('Server error');
    }
    const [posts, comments] = await Promise.all([
      await responsePosts.json(),
      await responseComments.json(),
    ]);
    return { posts, comments };
  } catch (error) {
    return error;
  }
}
