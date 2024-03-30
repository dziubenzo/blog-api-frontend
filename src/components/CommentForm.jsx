import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import API_URL from '../API';

function CommentForm({ postId, comments, setComments }) {
  // Reference to the form
  const formRef = useRef(null);

  // State for indicating that a comment has been successfully posted
  const [isCommentCreated, setIsCommentCreated] = useState(false);

  // Add comment to DB
  async function addComment(event) {
    event.preventDefault();
    // Retrieve and prepare form data
    const formData = new FormData(event.target);
    const newCommentData = {
      author: formData.get('author'),
      content: formData.get('content'),
      avatar_colour: formData.get('avatar_colour'),
    };
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newCommentData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Server error');
      }
      const newComment = await res.json();
      // Update comments state without mutation
      setComments([newComment, ...comments]);
      // Clear form fields
      formRef.current.reset();
      // Show success message to user for 3 seconds
      setIsCommentCreated(true);
      setTimeout(() => {
        setIsCommentCreated(false);
      }, 3000);
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <>
      {isCommentCreated ? (
        <>
          <h2>Comment posted successfully!</h2>
          <h2>Form will be back in 3 seconds...</h2>
        </>
      ) : (
        <form ref={formRef} method="post" onSubmit={addComment}>
          <fieldset>
            <legend>Add Comment</legend>
            <label htmlFor="author">Nickname:</label>
            <input
              type="text"
              name="author"
              id="author"
              minLength="3"
              maxLength="64"
              required
            />
            <label htmlFor="content">Text:</label>
            <textarea
              name="content"
              id="content"
              rows="6"
              minLength="3"
              maxLength="320"
              required
            ></textarea>
            <label htmlFor="avatar-colour">Avatar Colour:</label>
            <input
              type="color"
              name="avatar_colour"
              id="avatar-colour"
              defaultValue="#FFB937"
            />
            <button type="submit">Send</button>
          </fieldset>
        </form>
      )}
    </>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string,
  comments: PropTypes.array,
  setComments: PropTypes.func,
};

export default CommentForm;
