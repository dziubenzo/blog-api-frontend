import PropTypes from 'prop-types';
import { useRef } from 'react';

function CommentForm({ postId, comments, setComments }) {
  // Reference to the form
  const formRef = useRef(null);

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
      const res = await fetch(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          method: 'POST',
          body: JSON.stringify(newCommentData),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!res.ok) {
        throw new Error('Server error');
      }
      const newComment = await res.json();
      // Update comments state without mutation
      setComments([newComment, ...comments]);
      // Clear form fields
      formRef.current.reset();
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
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
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string,
  comments: PropTypes.array,
  setComments: PropTypes.func,
};

export default CommentForm;
