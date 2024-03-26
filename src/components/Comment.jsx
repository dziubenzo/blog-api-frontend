import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  addElementToLocalStorage,
  checkIfElementLiked,
  removeElementFromLocalStorage,
} from '../helpers';

function Comment({ comment }) {
  // Destructure comment into useful parts
  const { author, content, create_date, likes, avatar_colour, post } = comment;
  // Get first letter of nickname and uppercase it
  const firstLetter = author[0].toUpperCase();

  // State for updating comment likes count dynamically
  const [commentLikes, setCommentLikes] = useState(comment.likes);
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
      await fetch(
        `http://localhost:3000/posts/${post}/comments/${comment._id}/like`,
        {
          method: 'PUT',
        },
      );
      // Update localStorage and state
      setCommentLikes(commentLikes + 1);
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
      await fetch(
        `http://localhost:3000/posts/${post}/comments/${comment._id}/unlike`,
        {
          method: 'PUT',
        },
      );
      // Update localStorage and state
      setCommentLikes(commentLikes - 1);
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
          {commentLikes} {commentLikes === 1 ? 'like' : 'likes'}
        </p>
      </div>
      <div className="like-comment">
        <form
          method="post"
          onSubmit={isCommentLiked ? unlikeComment : likeComment}
        >
          <button type="submit" disabled={isButtonDisabled}>
            <img
              src={isCommentLiked ? 'liked.svg' : 'likes.svg'}
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
};

export default Comment;
