// Fetch all posts
export async function postsLoader() {
  try {
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) {
      throw new Error('Server error');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    return error;
  }
}
