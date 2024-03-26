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

// Check localStorage for whether or not a post/comment is liked
export function checkIfElementLiked(id, element) {
  // Create an empty array if it is the first visit to the post page
  if (!localStorage.getItem(element)) {
    localStorage.setItem(element, JSON.stringify([]));
    return false;
  }
  // Return true if post/comment id is in it
  // Return false if it isn't
  const likedElements = JSON.parse(localStorage.getItem(element));
  return likedElements.includes(id) ? true : false;
}

// Add liked post/comment to localStorage (like action)
export function addElementToLocalStorage(id, element) {
  const likedElements = JSON.parse(localStorage.getItem(element));
  likedElements.push(id);
  localStorage.setItem(element, JSON.stringify(likedElements));
}

// Remove liked post/comment from localStorage (unlike action)
export function removeElementFromLocalStorage(id, element) {
  const likedElements = JSON.parse(localStorage.getItem(element));
  const newLikedElements = likedElements.filter((storedId) => storedId !== id);
  localStorage.setItem(element, JSON.stringify(newLikedElements));
}
