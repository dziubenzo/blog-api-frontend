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

// Check localStorage for whether or not a post is liked
export function checkIfPostLiked(postId) {
  // Create an empty array if it is the first visit to the post page
  if (!localStorage.getItem('likedPosts')) {
    localStorage.setItem('likedPosts', JSON.stringify([]));
    return false;
  }
  // Return true if post id is in it
  // Return false if it isn't
  const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));
  return likedPosts.includes(postId) ? true : false;
}

// Add liked post to localStorage (like post action)
export function addPostToLocalStorage(postId) {
  const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));
  likedPosts.push(postId);
  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
}

// Remove liked post from localStorage (unlike post action)
export function removePostFromLocalStorage(postId) {
  const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));
  const newLikedPosts = likedPosts.filter((storedId) => storedId !== postId);
  localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
}
