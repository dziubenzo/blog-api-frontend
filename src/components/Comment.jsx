import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  addElementToLocalStorage,
  checkIfElementLiked,
  removeElementFromLocalStorage,
} from '../helpers';
import API_URL from '../API';

function Comment({ comment, comments, setComments }) {
  // Destructure comment into useful parts
  const { author, post, content, create_date, avatar_colour, likes } = comment;
  // Get first letter of nickname and uppercase it
  const firstLetter = author[0].toUpperCase();

  // State for determining whether or not the comment is already liked
  const [isCommentLiked, setIsCommentLiked] = useState(
    checkIfElementLiked(comment._id, 'likedComments'),
  );
  // State for disabling Like/Unlike button until after the component is rerendered
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Like comment
  async function likeComment(event) {
    event.preventDefault();
    try {
      // Disable button
      setIsButtonDisabled(true);
      const res = await fetch(
        `${API_URL}/posts/${post}/comments/${comment._id}/like`,
        {
          method: 'PUT',
        },
      );
      if (!res.ok) {
        throw new Error('Server error');
      }
      // Update comments state without mutation
      setComments(
        comments.map((element) => {
          if (element._id === comment._id) {
            return { ...element, likes: element.likes + 1 };
          } else {
            return element;
          }
        }),
      );
      // Update localStorage
      addElementToLocalStorage(comment._id, 'likedComments');
      setIsCommentLiked(true);
      setIsButtonDisabled(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Unlike comment
  async function unlikeComment(event) {
    event.preventDefault();
    try {
      // Disable button
      setIsButtonDisabled(true);
      const res = await fetch(
        `${API_URL}/posts/${post}/comments/${comment._id}/unlike`,
        {
          method: 'PUT',
        },
      );
      if (!res.ok) {
        throw new Error('Server error');
      }
      // Update comments state without mutation
      setComments(
        comments.map((element) => {
          if (element._id === comment._id) {
            return { ...element, likes: element.likes - 1 };
          } else {
            return element;
          }
        }),
      );
      // Update localStorage
      removeElementFromLocalStorage(comment._id, 'likedComments');
      setIsCommentLiked(false);
      setIsButtonDisabled(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="comment">
      <div className="comment-avatar" style={{ color: avatar_colour }}>
        {firstLetter}
      </div>
      <div className="comment-info">
        <p className="comment-author">{author}</p>
        <p className="comment-content">{content}</p>
        <p className="comment-time">{format(create_date, 'H:mm, dd/MM/y')}</p>
        <p className="comment-likes">
          {likes} {likes === 1 ? 'like' : 'likes'}
        </p>
      </div>
      <div className="like-comment">
        <form
          method="post"
          onSubmit={isCommentLiked ? unlikeComment : likeComment}
        >
          <button type="submit" disabled={isButtonDisabled}>
            <img
              src={isCommentLiked ? 'liked.svg' : 'like.svg'}
              alt={
                isCommentLiked ? 'Unlike Icon - Comment' : 'Like Icon - Comment'
              }
            />
          </button>
        </form>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  setComments: PropTypes.func,
};

export default Comment;
