import { format } from 'date-fns';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  // Destructure comment into useful parts
  const { author, content, create_date, likes, avatar_colour } = comment;
  // Get first letter of nickname and uppercase it
  const firstLetter = author[0].toUpperCase();

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
        <img src="likes.svg" alt="Like Icon - Comment" />
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
