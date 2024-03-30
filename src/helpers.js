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

// Check localStorage for theme value
// Set html darkMode attribute to it if it exists
export function getThemeFromLocalStorage() {
  if (!localStorage.getItem('dark-mode')) {
    localStorage.setItem('dark-mode', 'true');
    return true;
  } else {
    const theme = localStorage.getItem('dark-mode');
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('dark-mode', theme);
    return theme === 'true' ? true : false;
  }
}

// Change html darkMode attribute and write current theme value to localStorage
export function changeTheme(value) {
  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('dark-mode', value);
  localStorage.setItem('dark-mode', value);
}
